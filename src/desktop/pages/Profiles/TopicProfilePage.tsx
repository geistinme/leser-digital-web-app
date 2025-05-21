import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useParams } from "react-router"

import {
  ArticleCategory,
  ArticleGridFragment,
  useArticlesQuery,
  useTopicQuery,
} from "../../../../generated/graphql"
import { SourceShowcase } from "../../../shared/components"
import ArticleGrid from "../../components/Article/ArticleGrid"

interface TopicPageProps {}

const TopicPage: React.FC<TopicPageProps> = () => {
  const { topic: topicKey } = useParams<{ topic: string }>()

  const { data: topicQueryData } = useTopicQuery({
    variables: { category: topicKey?.toUpperCase() as ArticleCategory },
  })
  const { data: articlesQueryData, fetchMore } = useArticlesQuery({
    variables: {
      pagination: { offset: 0, limit: 10 },
      filter: { topic: topicKey?.toUpperCase() as ArticleCategory },
    },
  })

  const [hasMore, setHasMore] = useState(true)
  const loadMore = useCallback(() => {
    if (hasMore) {
      fetchMore({
        variables: {
          pagination: {
            offset: articlesQueryData?.articles?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.articles?.length ?? 0) < 10) {
            setHasMore(false)
          }
          if (
            prev.articles &&
            fetchMoreResult.articles &&
            (fetchMoreResult.articles?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              articles: [
                ...prev.articles,
                ...fetchMoreResult.articles,
              ] as ArticleGridFragment[],
            })
          }
          return prev
        },
      })
    }
  }, [articlesQueryData?.articles?.length, fetchMore, hasMore])

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const grid = useMemo(() => {
    if (articlesQueryData?.articles?.length) {
      return (
        <ArticleGrid
          articles={articlesQueryData.articles}
          compact
          lastRef={ref}
        />
      )
    } else {
      return null
    }
  }, [articlesQueryData?.articles, ref])

  return (
    <Flex direction="column" align="center" style={{ width: "100%" }}>
      <title>{topicQueryData?.topic?.name}</title>
      {topicQueryData?.topic ? (
        <SourceShowcase source={topicQueryData.topic} />
      ) : null}
      <Spacing gap="xl">
        <Flex
          direction="column"
          align="center"
          gap="lg"
          style={{ maxWidth: "64rem", margin: "auto" }}
        >
          {grid}
          {!hasMore ? (
            <Typography.Text disabled bold style={{ textAlign: "center" }}>
              Keine weiteren Artikel verfügbar.
            </Typography.Text>
          ) : null}
        </Flex>
      </Spacing>
    </Flex>
  )
}

export default TopicPage
