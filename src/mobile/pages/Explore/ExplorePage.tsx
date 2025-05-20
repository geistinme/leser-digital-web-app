import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"

import {
  ArticleFeedFragment,
  useMostViewedArticlesQuery,
} from "../../../../generated/graphql"
import { ArticleShowcase } from "../../../shared/components"
import ArticleFeed from "../../components/Article/ArticleFeed"

export const ExplorePage: React.FC = () => {
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

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ width: "100%", marginBottom: "4rem" }}
    >
      <title>Entdecken</title>
      {mostViewedArticle ? (
        <ArticleShowcase article={mostViewedArticle} />
      ) : null}
      {allOtherArticles ? feed : null}
    </Flex>
  )
}
