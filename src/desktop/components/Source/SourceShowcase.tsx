import React from "react";

import { Button, Flex, Spacing, Typography } from "@sampled-ui/base";

import { SourceProfileFragment } from "../../../../generated/graphql";
import { useColorScheme } from "../../../shared/hooks/colorScheme";
import { invertLogo } from "../Article/invertLogo";

interface SourceShowcaseProps {
  source: SourceProfileFragment;
}

export const SourceShowcase: React.FC<SourceShowcaseProps> = ({ source }) => {
  const { colorScheme } = useColorScheme();

  const invert =
    colorScheme === "dark" ? invertLogo(source?.key ?? "") : undefined;

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
            filter: invert ? `invert(1)` : undefined,
          }}
        />
      </Spacing>
      <Flex gap="md">
        <Flex gap="xs">
          <Typography.Text size="md" bold>
            192
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
        <Button style={{ minWidth: "6rem", marginTop: "1rem" }}>Folgen</Button>
      ) : null}
    </Flex>
  );
};
