import React, { useCallback, useEffect, useMemo, useState } from "react"

import {
  Button,
  Column,
  Flex,
  Row,
  Spacing,
  Typography,
} from "@sampled-ui/base"
import { BarChart, XIcon } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import {
  ArticleGridFragment,
  SearchTermDocument,
  useMostInterestingArticlesQuery,
  useSearchQuery,
  useSearchTermLazyQuery,
} from "../../../../generated/graphql"
import { useToggleSubscription } from "../../../shared/hooks/Subscription/toggleSubscription"
import ArticleGrid from "../../components/Article/ArticleGrid"
import SearchBar from "../../components/Search/SearchBar"
import SearchResults from "../../components/Search/SearchResults"

export const ExplorePage: React.FC = () => {
  const { data: mostInterestingQueryData, fetchMore: fetchMoreSuggested } =
    useMostInterestingArticlesQuery()

  const navigate = useNavigate()
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")
  const termParam = new URLSearchParams(location.search).get("term")

  const { data: searchData, fetchMore } = useSearchQuery({
    variables: {
      query: searchParam ?? "",
      term: termParam ?? "",
      pagination: { offset: 0, limit: 10 },
    },
  })
  const [hasMoreSuggested, setHasMoreSuggested] = useState(true)
  const [hasMoreResults, setHasMoreResults] = useState(true)

  const [searchTerm, { data: searchTermData }] = useSearchTermLazyQuery({
    variables: { id: termParam ?? "", term: searchParam ?? "" },
  })

  useEffect(() => {
    if (searchParam || termParam) {
      searchTerm({ variables: { id: termParam, term: searchParam } })
    } else {
      setHasMoreResults(true)
    }
  }, [searchParam, searchTerm, termParam])

  const loadMoreResults = useCallback(() => {
    if (hasMoreResults) {
      fetchMore({
        variables: {
          query: searchParam,
          pagination: {
            offset: searchData?.search?.articles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.search?.articles?.length ?? 0) < 10) {
            setHasMoreResults(false)
          }
          if (
            prev.search?.articles &&
            fetchMoreResult.search?.articles &&
            (fetchMoreResult.search?.articles?.length ?? 0) > 0
          ) {
            const nextArticles = [
              ...(prev.search?.articles ?? []),
              ...fetchMoreResult.search.articles,
            ] as ArticleGridFragment[]
            const next = Object.assign({}, prev, {
              search: {
                articles: nextArticles,
                foundArticles: prev?.search?.foundArticles ?? 0,
                sources: prev?.search?.sources,
                foundSources: prev?.search?.foundSources ?? 0,
                topics: prev?.search?.topics,
                foundTopics: prev?.search?.foundTopics ?? 0,
              },
            })
            return next
          }
          return prev
        },
      })
    }
  }, [
    hasMoreResults,
    fetchMore,
    searchParam,
    searchData?.search?.articles?.length,
  ])

  const loadMoreSuggested = useCallback(() => {
    if (hasMoreSuggested) {
      fetchMoreSuggested({
        variables: {
          query: searchParam,
          pagination: {
            offset: mostInterestingQueryData?.mostInterestingArticles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.mostInterestingArticles?.length ?? 0) < 10) {
            setHasMoreSuggested(false)
          }
          if (
            prev.mostInterestingArticles &&
            fetchMoreResult.mostInterestingArticles &&
            (fetchMoreResult.mostInterestingArticles?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              mostInterestingArticles: [
                ...prev.mostInterestingArticles,
                ...fetchMoreResult.mostInterestingArticles,
              ],
            })
          }
          return prev
        },
      })
    }
  }, [
    fetchMoreSuggested,
    hasMoreSuggested,
    mostInterestingQueryData?.mostInterestingArticles?.length,
    searchParam,
  ])

  const { ref: lastSuggestedRef, inView: lastSuggestedRefInView } = useInView()
  useEffect(() => {
    if (lastSuggestedRefInView && hasMoreSuggested) {
      loadMoreSuggested()
    }
  }, [hasMoreSuggested, lastSuggestedRefInView, loadMoreSuggested])

  const searchResults = useMemo(() => {
    return searchParam || termParam ? (
      <SearchResults
        articles={searchData?.search?.articles}
        foundArticles={searchData?.search?.foundArticles ?? 0}
        sources={searchData?.search?.sources}
        foundSources={searchData?.search?.foundSources ?? 0}
        topics={searchData?.search?.topics}
        foundTopics={searchData?.search?.foundTopics ?? 0}
        {...{ loadMore: loadMoreResults, hasMore: hasMoreResults }}
      />
    ) : null
  }, [
    hasMoreResults,
    loadMoreResults,
    searchData?.search,
    searchParam,
    termParam,
  ])

  const { handleToggle } = useToggleSubscription({
    createVariables: { termId: searchTermData?.searchTerm?.id },
    subscription: searchTermData?.searchTerm?.isSubscribed,
    refetchQueries: [SearchTermDocument],
  })

  return (
    <Spacing gap="xl">
      <title>Entdecken</title>
      <Flex
        gap="xl"
        direction="column"
        align="stretch"
        style={{ width: "100%", maxWidth: "64rem", margin: "auto" }}
      >
        <Row>
          <Column span={8}></Column>
          <Column span={8}>
            <SearchBar />
          </Column>
        </Row>
        {termParam &&
        (searchTermData?.searchTerm?.source ||
          searchTermData?.searchTerm?.topic) ? (
          <Flex gap="md" direction="column">
            <Typography.Text size="xl">
              {searchTermData?.searchTerm?.term ?? ""}
            </Typography.Text>
            <Flex>
              <BarChart size={16} />
              <Typography.Text>
                {searchTermData.searchTerm?.ranking} mal erwähnt
              </Typography.Text>
            </Flex>
            <Flex gap="xs">
              <Typography.Link
                onClick={() => {
                  if (searchTermData?.searchTerm?.source?.key) {
                    navigate(`/${searchTermData?.searchTerm?.source?.key}`)
                  } else if (searchTermData?.searchTerm?.topic?.category) {
                    navigate(
                      `/t/${searchTermData?.searchTerm?.topic?.category}`
                    )
                  }
                }}
              >
                in{" "}
                {(
                  searchTermData?.searchTerm?.source ||
                  searchTermData?.searchTerm?.topic
                )?.name ?? ""}
              </Typography.Link>
              <Typography.Link
                style={{ height: "1rem" }}
                onClick={() => {
                  if (searchTermData?.searchTerm?.term) {
                    const newParam = new URLSearchParams()
                    newParam.set("search", searchTermData.searchTerm?.term)
                    navigate(`/explore?${newParam.toString()}`)
                  } else {
                    navigate("/explore")
                  }
                }}
              >
                <XIcon size={16} />
              </Typography.Link>
            </Flex>
            {searchTermData?.searchTerm?.id ? (
              <Button
                variant={
                  searchTermData.searchTerm?.isSubscribed
                    ? "secondary"
                    : "primary"
                }
                style={{ minWidth: "6rem", marginTop: "1rem" }}
                onClick={handleToggle}
              >
                {searchTermData.searchTerm?.isSubscribed ? "Gefolgt" : "Folgen"}
              </Button>
            ) : null}
          </Flex>
        ) : null}
        {searchParam &&
        searchTermData?.searchTerm &&
        !(
          searchTermData?.searchTerm?.source ||
          searchTermData?.searchTerm?.topic
        ) ? (
          <Flex gap="md" direction="column">
            <Typography.Text size="xl">
              {searchParam ?? termParam}
            </Typography.Text>
            <Flex>
              <BarChart size={16} />
              <Typography.Text>
                {(searchData?.search?.foundArticles ?? 0) +
                  (searchData?.search?.foundSources ?? 0) +
                  (searchData?.search?.foundTopics ?? 0)}{" "}
                mal erwähnt
              </Typography.Text>
            </Flex>
            {searchTermData?.searchTerm?.id ? (
              <Button
                variant={
                  searchTermData.searchTerm?.isSubscribed
                    ? "secondary"
                    : "primary"
                }
                style={{ minWidth: "6rem", marginTop: "1rem" }}
                onClick={handleToggle}
              >
                {searchTermData.searchTerm?.isSubscribed ? "Gefolgt" : "Folgen"}
              </Button>
            ) : null}
          </Flex>
        ) : null}
        {(searchData?.search?.articles?.length &&
          searchParam &&
          !searchTermData?.searchTerm) ||
        (termParam && !searchTermData?.searchTerm) ? (
          <Flex gap="md" direction="column">
            <Typography.Text size="xl">
              {searchParam ?? termParam}
            </Typography.Text>
            <Flex>
              <BarChart size={16} />
              <Typography.Text>
                {(searchData?.search?.foundArticles ?? 0) +
                  (searchData?.search?.foundSources ?? 0) +
                  (searchData?.search?.foundTopics ?? 0)}{" "}
                mal erwähnt
              </Typography.Text>
            </Flex>
          </Flex>
        ) : null}
        {mostInterestingQueryData?.mostInterestingArticles?.length &&
        !searchParam &&
        !termParam ? (
          <ArticleGrid
            articles={mostInterestingQueryData.mostInterestingArticles}
            lastRef={lastSuggestedRef}
          />
        ) : null}
        {searchParam || termParam ? searchResults : null}
      </Flex>
    </Spacing>
  )
}
