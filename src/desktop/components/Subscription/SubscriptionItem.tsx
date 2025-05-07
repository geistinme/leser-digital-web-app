import React, { useCallback, useEffect, useState } from "react";

import { Flex, Typography } from "@sampled-ui/base";
import classNames from "classnames";
import { toKebabCase } from "js-convert-case";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";
import { useNavigate } from "react-router";

import {
  SourceSubscriptionFragment,
  TopicSubscriptionFragment,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  UserSubscriptionFragment,
  UserSubscriptionFragmentDoc,
} from "../../../../generated/graphql";
import PreloadImage from "../PreloadImage";

import styles from "./Subscription.module.scss";

interface SubscriptionItemProps {
  source: SourceSubscriptionFragment | TopicSubscriptionFragment;
  userSubscription?: UserSubscriptionFragment;
}

export const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  source,
  userSubscription,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );
  const navigate = useNavigate();

  useEffect(() => {
    Vibrant.from((source as SourceSubscriptionFragment).logo ?? source.banner)
      .getPalette()
      .then((palette) => {
        if ("logo" in source) {
          const hex = palette.Vibrant?.hex;
          setBackgroundColor(hex);
        } else {
          const rgb = palette.DarkVibrant?.rgb;
          setBackgroundColor(
            `rgba(${rgb?.[0]}, ${rgb?.[1]}, ${rgb?.[2]}, 20%)`
          );
        }
      })
      .catch((error) => {
        console.error("Error fetching palette:", error);
      });
  }, [source]);

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
        },
      });
    },
  });
  const [deleteSubscription] = useDeleteSubscriptionMutation({
    update: (cache) => {
      cache.modify({
        fields: {
          subscriptions(existingUserSubscriptions = [], { readField }) {
            return existingUserSubscriptions.filter(
              (userSubscriptionRef: UserSubscriptionFragment) =>
                readField("id", userSubscriptionRef) !==
                readField("id", userSubscription)
            );
          },
        },
      });
    },
  });

  const handleToggle = useCallback(() => {
    if (userSubscription) {
      deleteSubscription({ variables: { id: userSubscription.id } });
    } else {
      if (source.__typename === "Source") {
        createSubscription({
          variables: { sourceId: source?.id },
        });
      } else if (source.__typename === "Topic") {
        createSubscription({
          variables: { topicId: source?.id },
        });
      }
    }
  }, [createSubscription, deleteSubscription, source, userSubscription]);

  return (
    <div className={styles.item} title={source?.name}>
      <Flex
        direction="column"
        style={{ height: "100%", width: "100%", backgroundColor }}
      >
        <PreloadImage
          src={source?.banner}
          className={styles.banner}
          width="100%"
          height="100%"
          backgroundPosition="center 30%"
          backgroundSize="cover"
          onClick={handleToggle}
        />
        <Flex
          align="center"
          justify="center"
          className={classNames({
            [styles.logo]: "logo" in source,
            [styles.name]: !("logo" in source),
          })}
          onClick={() => {
            if (source.__typename === "Source") {
              navigate(`/${source?.key}`);
            } else if (source.__typename === "Topic") {
              navigate(`/${toKebabCase(source?.category)}`);
            }
          }}
        >
          {"logo" in source ? (
            <img src={source?.logo} />
          ) : (
            <Typography.Text size="lg">{source?.name}</Typography.Text>
          )}
        </Flex>
        <div
          className={classNames(styles.toggle, {
            [styles.active]: userSubscription,
          })}
          onClick={handleToggle}
        >
          {userSubscription ? <CheckIcon /> : <PlusIcon />}
        </div>
      </Flex>
    </div>
  );
};

export default SubscriptionItem;
