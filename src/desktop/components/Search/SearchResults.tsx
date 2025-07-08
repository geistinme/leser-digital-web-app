import React, { useEffect, useMemo } from "react"

import { Flex, Typography } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"

import {
  ArticleGridFragment,
  SourceGridFragment,
  TopicGridFragment,
  useSubscriptionsQuery,
} from "../../../../generated/graphql"
import ArticleGrid from "../Article/ArticleGrid"
import SubscriptionGrid from "../Subscription/SubscriptionGrid"

interface SearchResultsProps {
  articles?: ArticleGridFragment[] | null
  sources?: SourceGridFragment[] | null
  topics?: TopicGridFragment[] | null
  loadMore: () => void
  hasMore: boolean
}

const SearchResults: React.FC<SearchResultsProps> = ({
  articles,
  sources,
  topics,
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
      return <ArticleGrid articles={articles} lastRef={ref} />
    } else {
      return null
    }
  }, [articles, ref])

  const { data: userSubscriptionsData } = useSubscriptionsQuery()

  return [
    topics?.length || sources?.length ? (
      <Flex direction="column" gap="lg" align="start" key="topics">
        <SubscriptionGrid
          sources={[...(topics ?? []), ...(sources ?? [])]}
          userSubscriptions={userSubscriptionsData?.subscriptions}
        />
      </Flex>
    ) : null,
    articles?.length ? (
      <Flex direction="column" gap="lg" align="start" key="articles">
        {articleSearchGrid}
      </Flex>
    ) : null,
    emptySearch ? (
      <Typography.Text
        disabled
        bold
        style={{ textAlign: "center" }}
        key="empty"
      >
        Keine Artikel gefunden
      </Typography.Text>
    ) : null,
  ]
}

export default SearchResults
