import React, { useMemo } from "react"

import { Button, Flex, Typography } from "@sampled-ui/base"
import { BarChart, XIcon } from "lucide-react"
import { useLocation, useNavigate } from "react-router"

import {
  SearchMenuItemFragment,
  SearchQuery,
  SearchTermQuery,
  SearchTermsQuery,
  useSearchTermsQuery,
} from "../../../../generated/graphql"

import styles from "./Search.module.scss"

interface SearchTermProps {
  term: SearchTermQuery["searchTerm"] | undefined
  relatedTerms?: SearchTermsQuery["searchTerms"]
  search: SearchQuery["search"] | undefined
  handleToggle: () => void
}

export const TermBackground: React.FC<{
  term: string
  children: React.ReactNode
  relatedTerms?: SearchMenuItemFragment[]
  onClick?: (term: SearchMenuItemFragment) => void
}> = ({ term, children, relatedTerms, onClick }) => {
  if (!children) {
    return null
  }
  const firstThreeRelatedTerms = relatedTerms?.slice(0, 3)
  const nextRelatedTerms = relatedTerms?.slice(3, 7)
  const restRelatedTerms = relatedTerms?.slice(7, 11)
  return (
    <Flex className={styles.term} direction="column" align="start" gap="md">
      <Typography.Heading level={1} className={styles.termBackground}>
        {term}
      </Typography.Heading>
      <div className={styles.activeTerm}>{children}</div>
      <Flex align="start" gap="xl">
        <Flex direction="column" align="start" gap="sm">
          {(relatedTerms?.length ?? 0) > 0 &&
            firstThreeRelatedTerms?.map((term, index) => (
              <Typography.Text
                key={index}
                size="xl"
                className={styles.relatedTerm}
                onClick={() => {
                  onClick?.(term)
                }}
              >
                {term ? renderSearchTerm(term) : ""}
              </Typography.Text>
            ))}
        </Flex>
        {nextRelatedTerms && nextRelatedTerms.length > 0 ? (
          <Flex direction="column" align="start" gap="sm">
            {nextRelatedTerms?.map((term, index) => (
              <Typography.Text
                key={index}
                size="sm"
                className={styles.relatedTerm}
                onClick={() => {
                  onClick?.(term)
                }}
              >
                {term ? renderSearchTerm(term) : ""}
              </Typography.Text>
            ))}
          </Flex>
        ) : null}
        {restRelatedTerms && restRelatedTerms.length > 0 ? (
          <Flex direction="column" align="start" gap="sm">
            {restRelatedTerms?.map((term, index) => (
              <Typography.Text
                key={index}
                size="sm"
                className={styles.relatedTerm}
                onClick={() => {
                  onClick?.(term)
                }}
              >
                {term ? renderSearchTerm(term) : ""}
              </Typography.Text>
            ))}
          </Flex>
        ) : null}
      </Flex>
    </Flex>
  )
}

const renderSearchTerm = (term: SearchMenuItemFragment | undefined): string => {
  return (
    term?.term!.trim() +
    (term?.source ? ` (${term?.source.name})` : "") +
    (term?.topic ? ` (${term?.topic.name})` : "")
  )
}

export const SearchTerm: React.FC<SearchTermProps> = ({
  term,
  search,
  handleToggle,
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")

  const relatedTerms = useSearchTermsQuery({
    variables: {
      query: term?.term ?? searchParam ?? "",
      topicId: term?.topic?.id ?? undefined,
      sourceId: term?.source?.id ?? undefined,
      pagination: { offset: 0, limit: 20 },
    },
  }).data?.searchTerms?.filter((t) => t.id !== term?.id)

  const full = useMemo(() => {
    let node: React.ReactNode | undefined

    if (term && (term?.source || term?.topic)) {
      node = (
        <Flex
          gap="sm"
          direction="column"
          align="start"
          key={term?.id ?? searchParam}
        >
          <Flex gap="md" align="center">
            <Typography.Heading level={1}>
              {term?.term ?? ""}
            </Typography.Heading>
            {term?.id ? (
              <Button
                variant={term?.isSubscribed ? "secondary" : "primary"}
                onClick={handleToggle}
              >
                {term?.isSubscribed ? "Gefolgt" : "Folgen"}
              </Button>
            ) : null}
          </Flex>
          <Flex gap="xs">
            <BarChart size={16} />
            <Typography.Text>{term?.ranking} mal erwähnt</Typography.Text>
          </Flex>
          <Flex gap="xs">
            <Typography.Link
              onClick={() => {
                if (term?.source?.key) {
                  navigate(`/${term?.source?.key}`)
                } else if (term?.topic?.category) {
                  navigate(`/t/${term?.topic?.category}`)
                }
              }}
            >
              in {(term?.source || term?.topic)?.name ?? ""}
            </Typography.Link>
            <Typography.Link
              style={{ height: "1rem" }}
              onClick={() => {
                if (term?.term) {
                  const newParam = new URLSearchParams()
                  newParam.set("search", term?.term)
                  navigate(`/search?${newParam.toString()}`)
                } else {
                  navigate("/search")
                }
              }}
            >
              <XIcon size={16} />
            </Typography.Link>
          </Flex>
        </Flex>
      )
    } else if (term && !(term?.source || term?.topic)) {
      node = (
        <Flex
          gap="sm"
          direction="column"
          align="start"
          key={term?.id ?? searchParam}
        >
          <Flex gap="md" align="center">
            <Typography.Heading level={1}>
              {term?.term ?? ""}
            </Typography.Heading>
            {term?.id ? (
              <Button
                variant={term?.isSubscribed ? "secondary" : "primary"}
                onClick={handleToggle}
              >
                {term?.isSubscribed ? "Gefolgt" : "Folgen"}
              </Button>
            ) : null}
          </Flex>
          <Flex gap="xs">
            <BarChart size={16} />
            <Typography.Text>
              {(search?.foundArticles ?? 0) +
                (search?.foundSources ?? 0) +
                (search?.foundTopics ?? 0)}{" "}
              mal erwähnt
            </Typography.Text>
          </Flex>
        </Flex>
      )
    }

    if (term?.term) {
      return (
        <TermBackground
          key="term"
          term={term.term}
          relatedTerms={
            relatedTerms?.filter(Boolean) as SearchMenuItemFragment[]
          }
          onClick={(relatedTerm) => {
            const newParam = new URLSearchParams()
            if (relatedTerm.id) {
              newParam.set("term", relatedTerm.id ?? "")
            }
            navigate(`/search?${newParam.toString()}`)
          }}
        >
          {node}
        </TermBackground>
      )
    }

    if (search?.articles?.length && searchParam && !term) {
      return (
        <Flex gap="md" direction="column" key={searchParam}>
          <Typography.Text size="xl">{searchParam}</Typography.Text>
          <Flex>
            <BarChart size={16} />
            <Typography.Text>
              {(search?.foundArticles ?? 0) +
                (search?.foundSources ?? 0) +
                (search?.foundTopics ?? 0)}{" "}
              mal erwähnt
            </Typography.Text>
          </Flex>
        </Flex>
      )
    }
  }, [
    handleToggle,
    navigate,
    relatedTerms,
    search?.articles?.length,
    search?.foundArticles,
    search?.foundSources,
    search?.foundTopics,
    searchParam,
    term,
  ])

  return full
}

export default SearchTerm
