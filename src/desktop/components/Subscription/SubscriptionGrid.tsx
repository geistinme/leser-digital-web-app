import React, { useMemo } from "react";

import { Column, Flex, Row } from "@sampled-ui/base";

import {
  SourceSubscriptionFragment,
  TopicSubscriptionFragment,
  UserSubscriptionFragment,
} from "../../../../generated/graphql";

import styles from "./Subscription.module.scss";
import SubscriptionGridItem from "./SubscriptionItem";

interface SubscriptionGridItem {
  source: SourceSubscriptionFragment | TopicSubscriptionFragment;
  subscription?: UserSubscriptionFragment;
}

interface SubscriptionGridProps {
  userSubscriptions?: UserSubscriptionFragment[] | null;
  sources: SourceSubscriptionFragment[] | TopicSubscriptionFragment[] | null;
}

const SubscriptionGrid: React.FC<SubscriptionGridProps> = ({
  sources,
  userSubscriptions,
}) => {
  const gridRows = useMemo(() => {
    return sources?.reduce((allRows, _currentSource, index, allSources) => {
      const row = [];
      const columns = 4;
      for (let i = 0; i < columns; i++) {
        if (allSources[index + i]) {
          row.push({
            source: allSources[index + i],
            subscription: userSubscriptions?.find((s) => {
              return (
                s.source?.id === allSources[index + i].id ||
                s.topic?.id === allSources[index + i].id
              );
            }),
          });
        }
      }
      if (
        index === 0 ||
        index % columns === 0 ||
        allSources[row.length + 1] === undefined
      ) {
        return [...allRows, row];
      }
      return allRows;
    }, [] as SubscriptionGridItem[][]);
  }, [sources, userSubscriptions]);

  return (
    <Flex direction="column" gap="lg" style={{ width: "100%" }}>
      {gridRows?.map((row, index) => {
        return (
          <Row key={`row-${index}`} className={styles.row} gap={"0.0625rem"}>
            {row.map((source, i) => {
              return (
                <Column key={`column-${i}`} span={6} className={styles.column}>
                  <SubscriptionGridItem
                    source={source.source}
                    userSubscription={source.subscription}
                  />
                </Column>
              );
            })}
          </Row>
        );
      })}
    </Flex>
  );
};

export default SubscriptionGrid;
