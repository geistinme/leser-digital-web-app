import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Input, Spacing } from "@sampled-ui/base"
import { useLocation, useNavigate } from "react-router"

import {
  ArticleGridFragment,
  useMostViewedArticlesQuery,
  useSearchLazyQuery,
} from "../../../../generated/graphql"
import { ArticleShowcase } from "../../../shared/components"
import ArticleGrid from "../../components/Article/ArticleGrid"
import SearchResults from "../../components/Search/SearchResults"

export const ExplorePage: React.FC = () => {
  const navigate = useNavigate()
  const { data } = useMostViewedArticlesQuery()

  const mostViewedArticle = useMemo(
    () => (data?.mostViewedArticles ? data?.mostViewedArticles[0] : null),
    [data?.mostViewedArticles]
  )

  const allOtherArticles = useMemo(
    () =>
      data?.mostViewedArticles
        ? data?.mostViewedArticles.slice(1, data.mostViewedArticles.length)
        : null,
    [data?.mostViewedArticles]
  )

  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")
  const [search, { data: searchData, fetchMore }] = useSearchLazyQuery()
  const [hasMore, setHasMore] = useState(true)
  useEffect(() => {
    if (searchParam) {
      search({
        variables: {
          query: searchParam,
          pagination: { offset: 0, limit: 10 },
        },
      })
      setHasMore(true)
    }
  }, [search, searchParam])

  const loadMore = useCallback(() => {
    if (hasMore) {
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
            setHasMore(false)
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
  }, [hasMore, fetchMore, searchParam, searchData?.search?.articles?.length])

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
          {...{ loadMore, hasMore }}
        />
      )
    }
  }, [
    hasMore,
    loadMore,
    searchData?.search?.articles,
    searchData?.search?.foundArticles,
    searchData?.search?.foundSources,
    searchData?.search?.foundTopics,
    searchData?.search?.sources,
    searchData?.search?.topics,
    searchParam,
  ])

  return (
    <Spacing gap="xl">
      <title>Entdecken</title>
      <Flex
        gap="xl"
        direction="column"
        align="stretch"
        style={{ width: "100%", maxWidth: "64rem", margin: "auto" }}
      >
        <Input
          placeholder="Suchen"
          style={{ width: "16rem", alignSelf: "center" }}
          defaultValue={searchParam ?? ""}
          onChange={(e) => {
            navigate(`/explore?search=${e.target.value}`, { replace: true })
          }}
        />
        {mostViewedArticle && !searchParam ? (
          <ArticleShowcase article={mostViewedArticle} />
        ) : null}
        {allOtherArticles && !searchParam ? (
          <ArticleGrid articles={allOtherArticles} />
        ) : null}
        {searchResults}
      </Flex>
    </Spacing>
  )
}
