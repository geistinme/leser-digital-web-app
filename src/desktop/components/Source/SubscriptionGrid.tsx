import React, { useMemo } from "react";

import { Column, Flex, Row } from "@sampled-ui/base";

import { SourceSubscriptionFragment } from "../../../../generated/graphql";
import SubscriptionGridItem from "../Subscription/SubscriptionItem";

import styles from "./Source.module.scss";

interface SubscriptionGridProps {
  sources: SourceSubscriptionFragment[] | null;
}

const SubscriptionGrid: React.FC<SubscriptionGridProps> = ({ sources }) => {
  const gridRows = useMemo(() => {
    return sources?.reduce((allRows, _currentSource, index, allSources) => {
      const row = [];
      const columns = 4;
      for (let i = 0; i < columns; i++) {
        if (allSources[index + i]) {
          row.push(allSources[index + i]);
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
    }, [] as SourceSubscriptionFragment[][]);
  }, [sources]);

  return (
    <Flex direction="column" gap="md" style={{ width: "100%" }}>
      {gridRows?.map((row, index) => {
        return (
          <Row key={`row-${index}`} className={styles.row} gap={"0.0625rem"}>
            <Column span={6} className={styles.column}>
              {row[0] && <SubscriptionGridItem subscription={row[0]} />}
            </Column>
            <Column span={6}>
              {row[1] && <SubscriptionGridItem subscription={row[1]} />}
            </Column>
            <Column span={6}>
              {row[2] && <SubscriptionGridItem subscription={row[2]} />}
            </Column>
            <Column span={6}>
              {row[3] && <SubscriptionGridItem subscription={row[3]} />}
            </Column>
          </Row>
        );
      })}
    </Flex>
  );
};

export default SubscriptionGrid;
