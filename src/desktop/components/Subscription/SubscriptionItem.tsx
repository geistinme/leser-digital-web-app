import React, { useEffect, useState } from "react";

import { Flex } from "@sampled-ui/base";
import { PlusIcon } from "lucide-react";
import { Vibrant } from "node-vibrant/browser";

import { SourceGridFragment } from "../../../../generated/graphql";
import PreloadImage from "../PreloadImage";

import styles from "./Subscription.module.scss";

interface SubscriptionItemProps {
  subscription: SourceGridFragment;
}

export const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  subscription,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    Vibrant.from(subscription.logo)
      .getPalette()
      .then((palette) => {
        const hex = palette.Vibrant?.hex;
        if (hex) {
          setBackgroundColor(hex);
        }
      });
  }, [subscription]);

  return (
    <div className={styles.item} title={subscription.name}>
      <Flex
        direction="column"
        gap="md"
        style={{ height: "100%", width: "100%", backgroundColor }}
      >
        <PreloadImage
          src={subscription.banner}
          className={styles.banner}
          width="100%"
          height="100%"
        />
        <img src={subscription.logo} className={styles.logo} />
        <div className={styles.toggle}>
          <PlusIcon />
        </div>
      </Flex>
    </div>
  );
};

export default SubscriptionItem;
