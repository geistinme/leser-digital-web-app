import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Input, Spacing, Typography } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import {
  ArticleGridFragment,
  useMostViewedArticlesQuery,
  useSearchLazyQuery,
} from "../../../../generated/graphql"
import { ArticleShowcase } from "../../../shared/components"
import ArticleGrid from "../../components/Article/ArticleGrid"
import SubscriptionGrid from "../../components/Subscription/SubscriptionGrid"

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
  const emptySearch = useMemo(() => {
    return (
      !searchData?.search?.articles?.length &&
      !searchData?.search?.topics?.length &&
      !searchData?.search?.sources?.length
    )
  }, [
    searchData?.search?.articles?.length,
    searchData?.search?.sources?.length,
    searchData?.search?.topics?.length,
  ])

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
                sources: prev?.search?.sources,
                topics: prev?.search?.topics,
              },
            })
            console.debug(next)
            return next
          }
          return prev
        },
      })
    }
  }, [hasMore, fetchMore, searchParam, searchData?.search?.articles?.length])

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const articleSearchGrid = useMemo(() => {
    if (searchData?.search?.articles?.length) {
      return <ArticleGrid articles={searchData.search.articles} lastRef={ref} />
    } else {
      return null
    }
  }, [searchData?.search?.articles, ref])

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
        {searchData?.search?.sources?.length ? (
          <Flex direction="column" gap="lg" align="start">
            <Typography.Heading level={4}>Quellen</Typography.Heading>
            <SubscriptionGrid sources={searchData.search.sources} />
          </Flex>
        ) : null}
        {searchData?.search?.topics?.length ? (
          <Flex direction="column" gap="lg" align="start">
            <Typography.Heading level={4}>Themen</Typography.Heading>
            <SubscriptionGrid sources={searchData.search.topics} />
          </Flex>
        ) : null}
        {searchData?.search?.articles?.length ? (
          <Flex direction="column" gap="lg" align="start">
            <Typography.Heading level={4}>Artikel</Typography.Heading>
            {articleSearchGrid}
          </Flex>
        ) : null}
        {searchParam && emptySearch ? (
          <Typography.Text disabled bold style={{ textAlign: "center" }}>
            Keine Artikel gefunden
          </Typography.Text>
        ) : null}
      </Flex>
    </Spacing>
  )
}
