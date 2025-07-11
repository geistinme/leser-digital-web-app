import React, { useMemo } from "react"

import { Button, Flex, Spacing } from "@sampled-ui/base"
import { Rss } from "lucide-react"
import { Link } from "react-router"

import {
  useSourcesQuery,
  useSubscriptionsQuery,
  useTopicsQuery
} from "../../../../generated/graphql"
import SubscriptionGrid from "../../components/Subscription/SubscriptionGrid"
import TermSubscriptionsGrid from "../../components/Subscription/TermSubscriptionsGrid"

interface FollowingPageProps {}

export const FollowingPage: React.FC<FollowingPageProps> = () => {
  const { data: sourcesQueryData } = useSourcesQuery({
    variables: { pagination: { limit: 4 } },
  })
  const { data: topicsQueryData } = useTopicsQuery({
    variables: { pagination: { limit: 4 } },
  })
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
        gap="md"
        style={{ maxWidth: "64rem", margin: "auto" }}
      >
        {userSubscriptionsQueryData?.subscriptions?.length ? (
          <TermSubscriptionsGrid
            subscriptions={userSubscriptionsQueryData?.subscriptions.filter(
              (sub) => {
                if (
                  !sub.searchTerm.term &&
                  (sub.searchTerm.source || sub.searchTerm.topic)
                )
                  return true
                return !!sub.searchTerm.term
              }
            )}
          />
        ) : null}
        <Link to="/following/sources" style={{ all: "unset" }}>
          <Flex gap="sm" direction="column" align="start">
            <Button size="lg" ghost>
              <Flex gap="sm">
                <Rss size={20} />
                Alle Quellen
              </Flex>
            </Button>
          </Flex>
        </Link>
        {sourcesGrid}
        <Link to="/following/topics" style={{ all: "unset" }}>
          <Flex gap="sm" direction="column" align="start">
            <Button size="lg" ghost>
              <Flex gap="sm">
                <Rss size={20} />
                Alle Kategorien
              </Flex>
            </Button>
          </Flex>
        </Link>
        {topicGrid}
      </Flex>
    </Spacing>
  )
}
