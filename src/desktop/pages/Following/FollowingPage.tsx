import React from "react";

import { Flex, Spacing, Typography } from "@sampled-ui/base";

import { useSourcesQuery } from "../../../../generated/graphql";
import SubscriptionGrid from "../../components/Subscription/SubscriptionGrid";

interface FollowingPageProps {}

const FollowingPage: React.FC<FollowingPageProps> = () => {
  const { data: sourcesQueryData } = useSourcesQuery();
  return (
    <Spacing gap="xl">
      <title>Following</title>
      <Flex
        direction="column"
        align="start"
        gap="lg"
        style={{ maxWidth: "56rem", margin: "auto" }}
      >
        <Typography.Text bold size="lg">
          Folge deinen Favoriten
        </Typography.Text>
        {sourcesQueryData?.sources ? (
          <SubscriptionGrid sources={sourcesQueryData.sources} />
        ) : null}
      </Flex>
    </Spacing>
  );
};

export default FollowingPage;
