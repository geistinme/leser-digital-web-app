import React, { useCallback } from "react";

import { Button, Flex, Spacing, Typography } from "@sampled-ui/base";

import {
  SourceDocument,
  SourceProfileFragment,
  Subscription,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  UserSubscriptionFragment,
  UserSubscriptionFragmentDoc,
} from "../../../../generated/graphql";
import { useAuthRedirect } from "../../../shared/components/PrivatePage/hooks";
import { useInvertedLogo } from "../Article/invertLogo";

interface SourceShowcaseProps {
  source: SourceProfileFragment;
}

export const SourceShowcase: React.FC<SourceShowcaseProps> = ({ source }) => {
  const invert = useInvertedLogo(source.key);

  const { redirect, loggedIn } = useAuthRedirect();
  const [createSubscription] = useCreateSubscriptionMutation({
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          subscriptions(existingUserSubscriptions = []) {
            const newUserSubscriptionRef = cache.writeFragment({
              data: data?.createSubscription,
              fragment: UserSubscriptionFragmentDoc,
            });
            return [...existingUserSubscriptions, newUserSubscriptionRef];
          },
          source(existingSource, { readField }) {
            if (readField("key", existingSource) !== source.key) {
              return existingSource;
            }
            return {
              ...existingSource,
              isSubscribed: data?.createSubscription,
            };
          },
        },
      });
    },
    refetchQueries: [{ query: SourceDocument, variables: { key: source.key } }],
  });
  const [deleteSubscription] = useDeleteSubscriptionMutation({
    update: (cache) => {
      cache.modify({
        fields: {
          subscriptions(existingUserSubscriptions = [], { readField }) {
            return existingUserSubscriptions.filter(
              (userSubscriptionRef: UserSubscriptionFragment) =>
                readField("id", userSubscriptionRef) !==
                readField("id", source.isSubscribed as Subscription)
            );
          },
          source(existingSource, { readField }) {
            if (readField("key", existingSource) !== source.key) {
              return existingSource;
            }
            return {
              ...existingSource,
              isSubscribed: null,
            };
          },
        },
      });
    },
    refetchQueries: [{ query: SourceDocument, variables: { key: source.key } }],
  });

  const handleToggle = useCallback(() => {
    if (!loggedIn) {
      redirect();
      return;
    }
    if (source.isSubscribed) {
      deleteSubscription({ variables: { id: source.isSubscribed.id } });
    } else {
      createSubscription({
        variables: { sourceId: source?.id },
      });
    }
  }, [
    createSubscription,
    deleteSubscription,
    loggedIn,
    redirect,
    source?.id,
    source.isSubscribed,
  ]);

  return (
    <Flex
      align="center"
      justify="end"
      direction="column"
      style={{
        width: "100%",
        height: "14rem",
      }}
    >
      <Spacing gap="xl">
        <img
          src={source?.logo}
          style={{
            maxHeight: "3rem",
            borderRadius: "0.5rem",
            filter: invert ? `brightness(0) invert(1)` : undefined,
          }}
        />
      </Spacing>
      <Flex gap="md">
        <Flex gap="xs">
          <Typography.Text size="md" bold>
            {source.subscribers}
          </Typography.Text>
          <Typography.Text size="md" variant="secondary">
            Followers
          </Typography.Text>
        </Flex>
        <Flex gap="xs">
          <Typography.Text size="md" bold>
            {source?.articleCount}
          </Typography.Text>
          <Typography.Text size="md" variant="secondary">
            Articles
          </Typography.Text>
        </Flex>
      </Flex>
      {source?.id ? (
        <Button
          variant={source.isSubscribed ? "secondary" : "primary"}
          style={{ minWidth: "6rem", marginTop: "1rem" }}
          onClick={handleToggle}
        >
          {source.isSubscribed ? "Gefolgt" : "Folgen"}
        </Button>
      ) : null}
    </Flex>
  );
};
