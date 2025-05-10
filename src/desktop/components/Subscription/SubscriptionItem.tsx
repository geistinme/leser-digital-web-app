import React, { useEffect, useState } from "react";

import { Flex, Typography } from "@sampled-ui/base";
import classNames from "classnames";
import { toKebabCase } from "js-convert-case";
import { CheckIcon, PlusIcon } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";
import { useNavigate } from "react-router";

import {
  SourceGridFragment,
  TopicGridFragment,
  UserSubscriptionFragment,
} from "../../../../generated/graphql";
import { useToggleSubscription } from "../../../shared/hooks/Subscription/toggleSubscription";
import PreloadImage from "../PreloadImage";

import styles from "./Subscription.module.scss";

interface SubscriptionItemProps {
  source: SourceGridFragment | TopicGridFragment;
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
    Vibrant.from((source as SourceGridFragment).logo ?? source.banner)
      .getPalette()
      .then((palette) => {
        if ("logo" in source) {
          const hex = palette.Vibrant?.hex;
          setBackgroundColor(hex);
        }
      })
      .catch((error) => {
        console.error("Error fetching palette:", error);
      });
  }, [source]);

  const { handleToggle } = useToggleSubscription({
    createVariables:
      source.__typename === "Source"
        ? { sourceId: source.id }
        : { topicId: source.id },
    subscription: userSubscription,
  });

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
          onClick={() => {
            if (source.__typename === "Source") {
              navigate(`/${source?.key}`);
            } else if (source.__typename === "Topic") {
              navigate(`/t/${toKebabCase(source?.category)}`);
            }
          }}
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
              navigate(`/t/${toKebabCase(source?.category)}`);
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
