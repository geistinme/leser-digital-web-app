import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Input, Spacing } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import {
  ArticleFeedFragment,
  useMostViewedArticlesQuery,
  useSearchLazyQuery,
} from "../../../../generated/graphql"
import { ArticleShowcase } from "../../../shared/components"
import ArticleFeed from "../../components/Article/ArticleFeed"
import SearchResults from "../../components/Search/SearchResults"

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate()
  const { data: mostViewedArticlesQueryData, fetchMore } =
    useMostViewedArticlesQuery({
      variables: { pagination: { offset: 0, limit: 10 } },
    })

  const mostViewedArticle = useMemo(
    () =>
      mostViewedArticlesQueryData?.mostViewedArticles
        ? mostViewedArticlesQueryData?.mostViewedArticles[0]
        : null,
    [mostViewedArticlesQueryData?.mostViewedArticles]
  )

  const allOtherArticles = useMemo(
    () =>
      mostViewedArticlesQueryData?.mostViewedArticles
        ? mostViewedArticlesQueryData?.mostViewedArticles.slice(
            1,
            mostViewedArticlesQueryData.mostViewedArticles.length
          )
        : null,
    [mostViewedArticlesQueryData?.mostViewedArticles]
  )

  const [hasMore, setHasMore] = useState(true)
  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchMore({
        variables: {
          pagination: {
            offset: mostViewedArticlesQueryData?.mostViewedArticles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.mostViewedArticles?.length ?? 0) < 10) {
            setHasMore(false)
          }
          if (
            prev.mostViewedArticles &&
            fetchMoreResult.mostViewedArticles &&
            (fetchMoreResult.mostViewedArticles?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              articles: [
                ...prev.mostViewedArticles,
                ...fetchMoreResult.mostViewedArticles,
              ] as ArticleFeedFragment[],
            })
          }
          return prev
        },
      })
    }
  }, [
    mostViewedArticlesQueryData?.mostViewedArticles?.length,
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
    if (allOtherArticles?.length) {
      return <ArticleFeed articles={allOtherArticles} lastRef={ref} />
    } else {
      return null
    }
  }, [allOtherArticles, ref])

  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")
  const [search, { data: searchData, fetchMore: fetchMoreSearch }] =
    useSearchLazyQuery()
  const [hasMoreSearchResults, setHasMoreSearchResults] = useState(true)
  useEffect(() => {
    if (searchParam) {
      search({
        variables: {
          query: searchParam,
          pagination: { offset: 0, limit: 10 },
        },
      })
      setHasMoreSearchResults(true)
    }
  }, [search, searchParam])

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
        <Spacing gap="md">
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
        </Spacing>
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
      <Spacing gap="md">
        <Input
          placeholder="Suchen"
          size="sm"
          style={{
            width: "50%",
            position: "relative",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          defaultValue={searchParam ?? ""}
          onChange={(e) => {
            navigate(`/explore?search=${e.target.value}`, { replace: true })
          }}
        />
      </Spacing>
      {mostViewedArticle && !searchParam ? (
        <ArticleShowcase article={mostViewedArticle} />
      ) : null}
      {allOtherArticles && !searchParam ? feed : null}
      {searchResults}
    </Flex>
  )
}
