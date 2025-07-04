import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react"

import { Button, Flex, Spacing, Typography } from "@sampled-ui/base"
import { toHeaderCase } from "js-convert-case"
import { Check, XIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import {
  AdminSearchTermFragment,
  SearchTerm,
  useAllSearchTermsLazyQuery,
  useToggleSearchTermMutation,
} from "../../../../generated/graphql"

interface AdminSearchTermsProps {
  active?: boolean
}

const AdminSearchTerms: React.FC<AdminSearchTermsProps> = ({ active }) => {
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")
  const [
    searchTerms,
    { data: allSearchTermsQueryData, fetchMore: fetchMoreTerms },
  ] = useAllSearchTermsLazyQuery()

  useEffect(() => {
    searchTerms({
      variables: {
        pagination: {
          offset: 0,
          limit: 10,
        },
        query: searchParam ?? "",
        active,
      },
    })
    setHasMore(true)
  }, [
    active,
    allSearchTermsQueryData?.allSearchTerms,
    searchParam,
    searchTerms,
  ])

  const [toggleSearchTerm] = useToggleSearchTermMutation({
    update: (cache, { data }) => {
      if (data?.toggleSearchTerm) {
        const term = data.toggleSearchTerm as SearchTerm
        cache.modify({
          id: cache.identify(term),
          fields: {
            active() {
              return term.active
            },
          },
        })
      }
    },
  })

  const [hasMore, setHasMore] = useState(true)
  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchMoreTerms({
        variables: {
          pagination: {
            offset: allSearchTermsQueryData?.allSearchTerms?.length,
            limit: 10,
          },
          query: searchParam ?? "",
          active,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.allSearchTerms?.length ?? 0) < 10) {
            setHasMore(false)
          }
          if (
            prev.allSearchTerms &&
            fetchMoreResult.allSearchTerms &&
            (fetchMoreResult.allSearchTerms?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              allSearchTerms: [
                ...prev.allSearchTerms,
                ...fetchMoreResult.allSearchTerms,
              ] as AdminSearchTermFragment[],
            })
          }
          return prev
        },
      })
    }
  }, [
    active,
    allSearchTermsQueryData?.allSearchTerms?.length,
    fetchMoreTerms,
    hasMore,
    searchParam,
  ])

  const terms = useMemo(() => {
    if (allSearchTermsQueryData?.allSearchTerms?.length) {
      return (
        <SearchTermList
          terms={allSearchTermsQueryData.allSearchTerms}
          hasMore={hasMore}
          loadMore={loadMore}
          toggleSearchTerm={(term) =>
            toggleSearchTerm({ variables: { id: term.id } })
          }
        />
      )
    } else {
      return null
    }
  }, [
    allSearchTermsQueryData?.allSearchTerms,
    hasMore,
    loadMore,
    toggleSearchTerm,
  ])

  return terms
}

const SearchTermList: React.FC<{
  terms: AdminSearchTermFragment[]
  hasMore?: boolean
  loadMore: () => void
  toggleSearchTerm: (term: AdminSearchTermFragment) => void
}> = ({ terms, hasMore, loadMore, toggleSearchTerm }) => {
  const navigate = useNavigate()
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      {terms.map((term, index) => {
        const lastRef =
          index === (terms.length ?? 0) - 1
            ? (ref as unknown as RefObject<HTMLDivElement>)
            : undefined
        return (
          <Spacing gap="md" key={term.id} ref={lastRef}>
            <Flex gap="md" justify="between" align="center">
              <Flex gap="md" style={{ flex: 1 }}>
                <Typography.Link
                  size="md"
                  onClick={() => {
                    if (term.source?.name || term.topic?.name) {
                      navigate(`/explore?term=${term.id}`)
                    } else {
                      navigate(`/explore?term=${term.term}`)
                    }
                  }}
                >
                  {term.term!.trim() +
                    (term.source
                      ? ` (${toHeaderCase(term.source.name)})`
                      : "") +
                    (term.topic ? ` (${toHeaderCase(term.topic.name)})` : "")}
                </Typography.Link>
                {term.source?.name ? (
                  <Typography.Text disabled size="md" bold></Typography.Text>
                ) : null}
              </Flex>
              <Flex gap="md">
                <Typography.Text>{term.ranking}</Typography.Text>
                <Button
                  variant={term.active ? "success" : "secondary"}
                  style={{ maxHeight: 16, padding: "var(--spacing-sm)" }}
                  disabled={term.active}
                  onClick={() => {
                    toggleSearchTerm(term)
                  }}
                >
                  <Check size={16} />
                </Button>
                <Button
                  variant={term.active ? "secondary" : "danger"}
                  style={{ maxHeight: 16, padding: "var(--spacing-sm)" }}
                  disabled={!term.active}
                  onClick={() => {
                    toggleSearchTerm(term)
                  }}
                >
                  <XIcon size={16} />
                </Button>
              </Flex>
            </Flex>
          </Spacing>
        )
      })}
    </div>
  )
}

export default AdminSearchTerms
