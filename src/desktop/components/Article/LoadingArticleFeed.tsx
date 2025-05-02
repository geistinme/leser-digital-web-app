import React from "react";

import { Flex, Skeleton } from "@sampled-ui/base";

interface LoadingArticleFeedProps {}

const LoadingArticleFeed: React.FC<LoadingArticleFeedProps> = () => {
  return (
    <Flex direction="column" align="stretch" gap="lg" style={{ width: "100%" }}>
      <Flex direction="column" align="start" gap="md" style={{ width: "100%" }}>
        <Skeleton width="100%" height="20rem" />
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="80%" height="1rem" />
        <Skeleton width="100%" height="2rem" />
      </Flex>
      <Flex direction="column" align="start" gap="md" style={{ width: "100%" }}>
        <Skeleton width="100%" height="20rem" />
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="80%" height="1rem" />
        <Skeleton width="100%" height="2rem" />
      </Flex>
      <Flex direction="column" align="start" gap="md" style={{ width: "100%" }}>
        <Skeleton width="100%" height="20rem" />
        <Skeleton width="40%" height="1rem" />
        <Skeleton width="80%" height="1rem" />
        <Skeleton width="100%" height="2rem" />
      </Flex>
    </Flex>
  );
};

export default LoadingArticleFeed;
