import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Flex, Spacing } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation } from "react-router"

import {
  SourcesQuery,
  TopicsQuery,
  useSourcesLazyQuery,
  useSubscriptionsQuery,
  useTopicsLazyQuery,
} from "../../../../generated/graphql"
import SubscriptionGrid from "../../components/Subscription/SubscriptionGrid"

interface SourcesOrTopicsPageProps {}

const SourcesOrTopicsPage: React.FC<SourcesOrTopicsPageProps> = () => {
  const location = useLocation()

  const [
    sourcesQuery,
    { data: sourcesQueryData, fetchMore: fetchMoreSources },
  ] = useSourcesLazyQuery()
  const [topicsQuery, { data: topicsQueryData, fetchMore: fetchMoreTopics }] =
    useTopicsLazyQuery()
  const { data: userSubscriptionsQueryData } = useSubscriptionsQuery()

  useEffect(() => {
    if (location.pathname.endsWith("/sources")) {
      sourcesQuery({ variables: { pagination: { offset: 0, limit: 10 } } })
    } else if (location.pathname.endsWith("/topics")) {
      topicsQuery({ variables: { pagination: { offset: 0, limit: 10 } } })
    }
  }, [location.pathname, sourcesQuery, topicsQuery])

  const [hasMoreResults, setHasMoreResults] = useState(true)

  const loadMoreResults = useCallback(() => {
    if (hasMoreResults) {
      const fetchMore = location.pathname.endsWith("/sources")
        ? fetchMoreSources
        : fetchMoreTopics
      fetchMore({
        variables: {
          pagination: {
            offset:
              sourcesQueryData?.sources?.length ??
              topicsQueryData?.topics?.length,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (
            (fetchMoreResult.sources?.length ??
              (fetchMoreResult as TopicsQuery).topics?.length ??
              0) < 10
          ) {
            setHasMoreResults(false)
          }
          if (
            (prev as SourcesQuery).sources?.length ||
            ((prev as TopicsQuery).topics?.length &&
              fetchMoreResult.sources?.length) ||
            ((fetchMoreResult as TopicsQuery).topics?.length &&
              (fetchMoreResult.sources?.length ??
                (fetchMoreResult as TopicsQuery).topics?.length ??
                0) > 0)
          ) {
            const next = [
              ...((prev as SourcesQuery).sources ??
                (prev as TopicsQuery).topics ??
                []),
              ...(fetchMoreResult.sources ??
                (fetchMoreResult as TopicsQuery).topics ??
                []),
            ]
            return (prev as SourcesQuery).sources
              ? ({ ...prev, sources: next } as SourcesQuery)
              : (prev as TopicsQuery).topics
              ? ({
                  ...(prev as TopicsQuery).topics,
                  topics: next,
                } as TopicsQuery)
              : prev
          }
          return prev
        },
      })
    }
  }, [
    hasMoreResults,
    location.pathname,
    fetchMoreSources,
    fetchMoreTopics,
    sourcesQueryData?.sources?.length,
    topicsQueryData?.topics?.length,
  ])

  const { ref, inView } = useInView()
  useEffect(() => {
    if (inView && hasMoreResults) {
      if (
        ((sourcesQueryData?.sources || topicsQueryData?.topics)?.length ?? 0) <
        10
      ) {
        setHasMoreResults(false)
      } else {
        loadMoreResults()
      }
    }
  }, [
    hasMoreResults,
    inView,
    loadMoreResults,
    sourcesQueryData?.sources,
    topicsQueryData?.topics,
  ])

  const sourcesGrid = useMemo(() => {
    return sourcesQueryData?.sources ? (
      <SubscriptionGrid
        sources={sourcesQueryData.sources}
        userSubscriptions={userSubscriptionsQueryData?.subscriptions}
        lastRef={ref}
      />
    ) : null
  }, [
    ref,
    sourcesQueryData?.sources,
    userSubscriptionsQueryData?.subscriptions,
  ])

  const topicGrid = useMemo(() => {
    return topicsQueryData?.topics ? (
      <SubscriptionGrid
        sources={topicsQueryData.topics}
        userSubscriptions={userSubscriptionsQueryData?.subscriptions}
        lastRef={ref}
      />
    ) : null
  }, [ref, topicsQueryData?.topics, userSubscriptionsQueryData?.subscriptions])

  return (
    <Spacing gap="xl">
      <title>Gefolgt</title>
      <Flex
        direction="column"
        align="start"
        gap="lg"
        style={{ maxWidth: "56rem", margin: "auto" }}
      >
        {sourcesGrid || topicGrid}
      </Flex>
    </Spacing>
  )
}

export default SourcesOrTopicsPage
