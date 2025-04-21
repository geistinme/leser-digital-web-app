import React, { useMemo } from "react";

import { Column, Flex, Row } from "@sampled-ui/base";

import { SourceGridFragment } from "../../../../generated/graphql";
import SourceGridItem from "../Subscription/SubscriptionItem";

import styles from "./Source.module.scss";

interface SourceGridProps {
  sources: SourceGridFragment[] | null;
}

const SourceGrid: React.FC<SourceGridProps> = ({ sources }) => {
  const gridRows = useMemo(() => {
    return sources?.reduce((allRows, _currentSource, index, allSources) => {
      const row = [];
      const columns = 4;
      for (let i = 0; i < columns; i++) {
        if (allSources[index + i]) {
          row.push(allSources[index + i]);
        }
      }
      console.debug(index, row)
      if (
        (index === 0 || index % 4 === 0) &&
        row.filter((a) => !!a).length === 4
      ) {
        return [...allRows, row];
      }
      return allRows;
    }, [] as SourceGridFragment[][]);
  }, [sources]);

  console.debug(sources, gridRows);

  return (
    <Flex direction="column" style={{ width: "100%" }}>
      {gridRows?.map((row, index) => {
        return (
          <Row key={`row-${index}`} className={styles.row} gap={"0.0625rem"}>
            <Column span={6} className={styles.column}>
              <SourceGridItem subscription={row[0]} />
            </Column>
            <Column span={6}>
              <SourceGridItem subscription={row[1]} />
            </Column>
            <Column span={6}>
              <SourceGridItem subscription={row[2]} />
            </Column>
            <Column span={6}>
              <SourceGridItem subscription={row[3]} />
            </Column>
          </Row>
        );
      })}
    </Flex>
  );
};

export default SourceGrid;
