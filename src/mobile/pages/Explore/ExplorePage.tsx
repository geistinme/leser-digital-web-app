import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation } from "react-router"

import {
  ArticleFeedFragment,
  useMostInterestingArticlesQuery,
  useSearchLazyQuery,
} from "../../../../generated/graphql"
import ArticleFeed from "../../components/Article/ArticleFeed"
import SearchResults from "../../components/Search/SearchResults"

export const ExplorePage: React.FC = () => {
  const { data: mostInterestingQueryData, fetchMore } =
    useMostInterestingArticlesQuery({
      variables: { pagination: { offset: 0, limit: 10 } },
    })

  const [hasMore, setHasMore] = useState(true)
  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchMore({
        variables: {
          pagination: {
            offset: mostInterestingQueryData?.mostInterestingArticles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.mostInterestingArticles?.length ?? 0) < 10) {
            setHasMore(false)
          }
          if (
            prev.mostInterestingArticles &&
            fetchMoreResult.mostInterestingArticles &&
            (fetchMoreResult.mostInterestingArticles?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              articles: [
                ...prev.mostInterestingArticles,
                ...fetchMoreResult.mostInterestingArticles,
              ] as ArticleFeedFragment[],
            })
          }
          return prev
        },
      })
    }
  }, [
    mostInterestingQueryData?.mostInterestingArticles?.length,
    fetchMore,
    hasMore,
  ])

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const feed = useMemo(() => {
    if (mostInterestingQueryData?.mostInterestingArticles?.length) {
      return (
        <ArticleFeed
          articles={mostInterestingQueryData.mostInterestingArticles}
          lastRef={ref}
        />
      )
    } else {
      return null
    }
  }, [mostInterestingQueryData, ref])

  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")
  const termParam = new URLSearchParams(location.search).get("term")
  const [search, { data: searchData, fetchMore: fetchMoreSearch }] =
    useSearchLazyQuery()
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(true)
  useEffect(() => {
    if (searchParam) {
      search({
        variables: {
          term: termParam ?? "",
          query: searchParam ?? "",
          pagination: { offset: 0, limit: 10 },
        },
      })
      setHasMoreSearchResults(true)
    }
  }, [search, searchParam, termParam])

  const loadMoreSearchResults = useCallback(() => {
    if (hasMoreSearchResults) {
      fetchMoreSearch({
        variables: {
          query: searchParam,
          pagination: {
            offset: searchData?.search?.articles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.search?.articles?.length ?? 0) < 10) {
            setHasMoreSearchResults(false)
          }
          if (
            prev.search?.articles &&
            fetchMoreResult.search?.articles &&
            (fetchMoreResult.search?.articles?.length ?? 0) > 0
          ) {
            const nextArticles = [
              ...(prev.search?.articles ?? []),
              ...fetchMoreResult.search.articles,
            ] as ArticleFeedFragment[]
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
    hasMoreSearchResults,
    fetchMoreSearch,
    searchParam,
    searchData?.search?.articles?.length,
  ])

  const searchResults = useMemo(() => {
    if (searchParam) {
      return (
        <SearchResults
          articles={searchData?.search?.articles}
          foundArticles={searchData?.search?.foundArticles ?? 0}
          sources={searchData?.search?.sources}
          foundSources={searchData?.search?.foundSources ?? 0}
          topics={searchData?.search?.topics}
          foundTopics={searchData?.search?.foundTopics ?? 0}
          loadMore={loadMoreSearchResults}
          hasMore={hasMoreSearchResults}
        />
      )
    }
  }, [
    hasMoreSearchResults,
    loadMoreSearchResults,
    searchData?.search?.articles,
    searchData?.search?.foundArticles,
    searchData?.search?.foundSources,
    searchData?.search?.foundTopics,
    searchData?.search?.sources,
    searchData?.search?.topics,
    searchParam,
  ])

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ width: "100%", marginBottom: "4rem" }}
    >
      <title>Entdecken</title>
      {mostInterestingQueryData && !searchParam ? feed : null}
      {searchResults}
    </Flex>
  )
}
