import React, { useMemo } from "react"

import { Column, Flex, Row } from "@sampled-ui/base"

import {
  SourceGridFragment,
  TopicGridFragment,
  UserSubscriptionFragment,
} from "../../../../generated/graphql"
import SubscriptionGridItem from "../../../shared/components/Subscription/SubscriptionItem"

interface SubscriptionGridItem {
  term: UserSubscriptionFragment["searchTerm"]
  source?: SourceGridFragment | TopicGridFragment
  subscription?: UserSubscriptionFragment
}

interface TermSubscriptionsGridProps {
  subscriptions: UserSubscriptionFragment[] | null
}

const TermSubscriptionsGrid: React.FC<TermSubscriptionsGridProps> = ({
  subscriptions,
}) => {
  const gridRows = useMemo(() => {
    return subscriptions?.reduce(
      (allRows, _currentSubscriptions, index, allSubscriptions) => {
        const row = []
        const columns = 4
        for (let i = 0; i < columns; i++) {
            const subscription = allSubscriptions[index + i]
          if (
            subscription &&
            (subscription?.searchTerm.source ||
              subscription?.searchTerm.topic)
          ) {
            row.push({
              term: subscription.searchTerm,
              source:
                subscription.searchTerm.source ??
                subscription.searchTerm.topic,
              subscription,
            } as SubscriptionGridItem)
          } else if (subscription) {
            row.push({
              term: subscription.searchTerm,
              source: undefined,
              subscription,
            } as SubscriptionGridItem)
          }
        }
        if (
          index === 0 ||
          index % columns === 0 ||
          allSubscriptions[index] === undefined
        ) {
          return [...allRows, row]
        }
        return allRows
      },
      [] as SubscriptionGridItem[][]
    )
  }, [subscriptions])

  if (!subscriptions || !subscriptions.length) {
    return null
  }

  return (
    <Flex direction="column" gap="lg" style={{ width: "100%" }}>
      {gridRows?.map((row, index) => {
        return (
          <Row key={`row-${index}`} style={{ height: "24rem" }} gap="1rem">
            {row.map((subscription, i) => {
              return (
                <Column key={`column-${i}`} span={6} style={{ height: "100%" }}>
                  <SubscriptionGridItem
                    term={subscription.term}
                    source={subscription.source}
                    userSubscription={subscription.subscription}
                  />
                </Column>
              )
            })}
          </Row>
        )
      })}
    </Flex>
  )
}

export default TermSubscriptionsGrid
