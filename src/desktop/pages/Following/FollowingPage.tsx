import React, { useMemo } from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"

import {
  useSourcesQuery,
  useSubscriptionsQuery,
  useTopicsQuery,
} from "../../../../generated/graphql"
import SubscriptionGrid from "../../components/Subscription/SubscriptionGrid"

interface FollowingPageProps {}

export const FollowingPage: React.FC<FollowingPageProps> = () => {
  const { data: sourcesQueryData } = useSourcesQuery()
  const { data: topicsQueryData } = useTopicsQuery()
  const { data: userSubscriptionsQueryData } = useSubscriptionsQuery()

  const sourcesGrid = useMemo(() => {
    return sourcesQueryData?.sources ? (
      <SubscriptionGrid
        sources={sourcesQueryData.sources}
        userSubscriptions={userSubscriptionsQueryData?.subscriptions}
      />
    ) : null
  }, [sourcesQueryData?.sources, userSubscriptionsQueryData?.subscriptions])

  const topicGrid = useMemo(() => {
    return topicsQueryData?.topics ? (
      <SubscriptionGrid
        sources={topicsQueryData.topics}
        userSubscriptions={userSubscriptionsQueryData?.subscriptions}
      />
    ) : null
  }, [topicsQueryData?.topics, userSubscriptionsQueryData?.subscriptions])

  return (
    <Spacing gap="xl">
      <title>Gefolgt</title>
      <Flex
        direction="column"
        align="start"
        gap="lg"
        style={{ maxWidth: "56rem", margin: "auto" }}
      >
        <Typography.Text variant="secondary" size="lg">
          Folge deinen Favoriten
        </Typography.Text>
        {sourcesGrid}
        <Typography.Text variant="secondary" size="lg">
          Folge deinen Interessen
        </Typography.Text>
        {topicGrid}
      </Flex>
    </Spacing>
  )
}
