import React from "react"

import { Button, Flex, Spacing, Typography } from "@sampled-ui/base"

import {
  SourceDocument,
  SourceProfileFragment,
  TopicDocument,
  TopicProfileFragment,
} from "../../../../generated/graphql"
import { useInvertedLogo } from "../../../shared/hooks/Article/invertLogo"
import { useToggleSubscription } from "../../../shared/hooks/Subscription/toggleSubscription"

import styles from "./Source.module.scss"

interface SourceShowcaseProps {
  source: SourceProfileFragment | TopicProfileFragment
}

export const SourceShowcase: React.FC<SourceShowcaseProps> = ({ source }) => {
  const isTopic = "category" in source
  const invert = useInvertedLogo((source as SourceProfileFragment).key)

  const { handleToggle } = useToggleSubscription({
    createVariables: isTopic ? { topicId: source.id } : { sourceId: source.id },
    subscription: source.isSubscribed,
    refetchQueries: isTopic ? [TopicDocument] : [SourceDocument],
  })

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
        {isTopic ? (
          <Typography.Heading level={2} className={styles.name}>
            {source.name}
          </Typography.Heading>
        ) : (
          <img
            src={source?.logo}
            style={{
              maxHeight: "3rem",
              borderRadius: "0.5rem",
              filter: invert ? `brightness(0) invert(1)` : undefined,
            }}
          />
        )}
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
  )
}
