import React, { useCallback, useEffect, useState } from "react";

import { Flex } from "@sampled-ui/base";
import classNames from "classnames";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";
import { useNavigate } from "react-router";

import {
  SourceSubscriptionFragment,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  UserSubscriptionFragment,
  UserSubscriptionFragmentDoc,
} from "../../../../generated/graphql";
import PreloadImage from "../PreloadImage";

import styles from "./Subscription.module.scss";
import { CategorySubscription } from "./SubscriptionGrid";

interface SubscriptionItemProps {
  source: SourceSubscriptionFragment | CategorySubscription;
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
    if (!("logo" in source)) {
      return;
    }
    Vibrant.from(source.logo)
      .getPalette()
      .then((palette) => {
        const hex = palette.Vibrant?.hex;
        if (hex) {
          setBackgroundColor(hex);
        }
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
      if ("__typename" in source) {
        createSubscription({
          variables: { sourceId: source?.id },
        });
      } else {
        createSubscription({
          variables: { category: source?.key },
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
          onClick={handleToggle}
        />
        <Flex
          align="center"
          justify="center"
          className={styles.logo}
          onClick={() => navigate(`/${source?.key}`)}
        >
          {"logo" in source ? <img src={source?.logo} /> : source?.name}
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
