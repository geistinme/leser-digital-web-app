import React, { useEffect, useMemo } from "react"

import { Flex, Typography } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"

import {
    ArticleFeedFragment,
    SourceGridFragment,
    TopicGridFragment,
} from "../../../../generated/graphql"
import ArticleFeed from "../Article/ArticleFeed"
import SubscriptionGrid from "../Subscription/SubscriptionGrid"

interface SearchResultsProps {
  articles?: ArticleFeedFragment[] | null
  foundArticles?: number | null
  sources?: SourceGridFragment[] | null
  foundSources?: number | null
  topics?: TopicGridFragment[] | null
  foundTopics?: number | null
  loadMore: () => void
  hasMore: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({
  articles,
  foundArticles,
  sources,
  foundSources,
  topics,
  foundTopics,
  hasMore,
  loadMore,
}) => {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const emptySearch = useMemo(() => {
    return !articles?.length && !topics?.length && !sources?.length
  }, [articles?.length, sources?.length, topics?.length])

  const articleSearchGrid = useMemo(() => {
    if (articles?.length) {
      return <ArticleFeed articles={articles} lastRef={ref} />
    } else {
      return null
    }
  }, [articles, ref])

  return (
    <Flex direction="column" align="stretch" gap="md">
      {sources?.length ? (
        <Flex direction="column" gap="sm" align="start" key="sources">
          <Typography.Text size="md" disabled>
            {`Quellen (${foundSources ?? 0})`}
          </Typography.Text>
          <SubscriptionGrid sources={sources} />
        </Flex>
      ) : null}
      {topics?.length ? (
        <Flex direction="column" gap="sm" align="start" key="topics">
          <Typography.Text size="md" disabled>
            {`Themen (${foundTopics ?? 0})`}
          </Typography.Text>
          <SubscriptionGrid sources={topics} />
        </Flex>
      ) : null}
      {articles?.length ? (
        <Flex direction="column" gap="sm" align="start" key="articles">
          <Typography.Text size="md" disabled>
            {`Artikel (${foundArticles ?? 0})`}
          </Typography.Text>
          {articleSearchGrid}
        </Flex>
      ) : null}
      {emptySearch ? (
        <Typography.Text
          disabled
          bold
          style={{ textAlign: "center" }}
          key="empty"
        >
          Keine Artikel gefunden
        </Typography.Text>
      ) : null}
    </Flex>
  )
}

export default SearchResults
