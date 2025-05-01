import React from "react";

import { Flex, Spacing, Typography } from "@sampled-ui/base";

import {
  useSourcesQuery,
  useSubscriptionsQuery,
} from "../../../../generated/graphql";
import SubscriptionGrid from "../../components/Subscription/SubscriptionGrid";

interface FollowingPageProps {}

const FollowingPage: React.FC<FollowingPageProps> = () => {
  const { data: sourcesQueryData } = useSourcesQuery();
  const { data: userSubscriptionsQueryData } = useSubscriptionsQuery();
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
        {sourcesQueryData?.sources ? (
          <SubscriptionGrid
            sources={sourcesQueryData.sources}
            userSubscriptions={userSubscriptionsQueryData?.subscriptions}
          />
        ) : null}
      </Flex>
    </Spacing>
  );
};

export default FollowingPage;
