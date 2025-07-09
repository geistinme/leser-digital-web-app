import React, { useEffect, useMemo } from "react"

import { Flex } from "@sampled-ui/base"
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
  loading: boolean,
}

const SearchResults: React.FC<SearchResultsProps> = ({
  articles,
  sources,
  topics,
  hasMore,
  loading,
  loadMore,
}) => {
  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMore) {
      loadMore()
    }
  }, [hasMore, inView, loadMore])

  const articleSearchGrid = useMemo(() => {
    if (articles?.length) {
      return <ArticleGrid articles={articles} loading={loading} lastRef={ref} />
    } else {
      return null
    }
  }, [articles, loading, ref])

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
  ]
}

export default SearchResults
