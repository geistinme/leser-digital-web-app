import React, { RefObject, useMemo } from "react"

import { Column, Flex, Row } from "@sampled-ui/base"

import {
  SourceGridFragment,
  TopicGridFragment,
  UserSubscriptionFragment,
} from "../../../../generated/graphql"
import SubscriptionGridItem from "../../../shared/components/Subscription/SubscriptionItem"

interface SubscriptionGridItem {
  source: SourceGridFragment | TopicGridFragment
  subscription?: UserSubscriptionFragment
}

interface SubscriptionGridProps {
  userSubscriptions?: UserSubscriptionFragment[] | null
  sources: (SourceGridFragment | TopicGridFragment)[] | null
  lastRef?: (node?: Element | null) => void
}

const SubscriptionGrid: React.FC<SubscriptionGridProps> = ({
  sources,
  userSubscriptions,
  lastRef,
}) => {
  const gridRows = useMemo(() => {
    return sources?.reduce((allRows, _currentSource, index, allSources) => {
      const row = []
      const columns = 4
      for (let i = 0; i < columns; i++) {
        if (allSources[index + i]) {
          row.push({
            source: allSources[index + i],
            subscription: userSubscriptions?.find((s) => {
              const source = allSources[index + i]
              return (
                (s.searchTerm.source?.id === source.id && !s.searchTerm.term) ||
                (s.searchTerm.topic?.id === source.id && !s.searchTerm.term)
              )
            }) as UserSubscriptionFragment | undefined,
          })
        }
      }
      if (
        index === 0 ||
        index % columns === 0 ||
        allSources[index] === undefined
      ) {
        return [...allRows, row]
      }
      return allRows
    }, [] as SubscriptionGridItem[][])
  }, [sources, userSubscriptions])

  return (
    <Flex direction="column" gap="lg" style={{ width: "100%" }}>
      {gridRows?.map((row, index) => {
        return (
          <Row key={`row-${index}`} style={{ height: "24rem" }} gap="1rem">
            {row.map((source, i) => {
              return (
                <Column
                  key={`column-${i}`}
                  span={6}
                  style={{ height: "100%" }}
                  ref={
                    index + 1 === gridRows.length &&
                    i + 1 === row.length &&
                    lastRef
                      ? (lastRef as unknown as RefObject<HTMLDivElement | null>)
                      : undefined
                  }
                >
                  <SubscriptionGridItem
                    source={source.source}
                    userSubscription={source.subscription}
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

export default SubscriptionGrid
