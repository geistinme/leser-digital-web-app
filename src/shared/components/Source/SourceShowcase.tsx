import React from "react"

import { Button, Flex, Spacing, Typography } from "@sampled-ui/base"
import { useNavigate } from "react-router"

import {
  SourceDocument,
  SourceProfileFragment,
  TopicDocument,
  TopicProfileFragment,
  useSearchTermsQuery,
} from "../../../../generated/graphql"
import { useInvertedLogo } from "../../../shared/hooks/Article/invertLogo"
import { useToggleSubscription } from "../../../shared/hooks/Subscription/toggleSubscription"

import styles from "./Source.module.scss"

interface SourceShowcaseProps {
  source?: SourceProfileFragment
  topic?: TopicProfileFragment
}

export const SourceShowcase: React.FC<SourceShowcaseProps> = ({
  source,
  topic,
}) => {
  const navigate = useNavigate()
  const invert = useInvertedLogo(source?.key)

  const { handleToggle } = useToggleSubscription({
    createVariables: topic ? { topicId: topic.id } : { sourceId: source?.id },
    subscription: (source ?? topic)?.isSubscribed,
    refetchQueries: topic ? [TopicDocument] : [SourceDocument],
  })

  const { data: searchTermsQueryData } = useSearchTermsQuery({
    variables: topic
      ? { topicId: topic.id, pagination: { offset: 0, limit: 15 } }
      : { sourceId: source?.id, pagination: { offset: 0, limit: 15 } },
  })

  return (
    <Flex
      align="center"
      justify="end"
      direction="column"
      style={{
        width: "100%",
        paddingTop: "5rem",
      }}
    >
      <Spacing gap="xl">
        {topic ? (
          <Typography.Heading level={2} className={styles.name}>
            {topic.name}
          </Typography.Heading>
        ) : (
          <img
            src={source?.logo}
            style={{
              maxWidth: "100%",
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
            {(source ?? topic)?.subscribers}
          </Typography.Text>
          <Typography.Text size="md" variant="secondary">
            Followers
          </Typography.Text>
        </Flex>
        <Flex gap="xs">
          <Typography.Text size="md" bold>
            {(source ?? topic)?.articleCount}
          </Typography.Text>
          <Typography.Text size="md" variant="secondary">
            Articles
          </Typography.Text>
        </Flex>
      </Flex>
      {(source ?? topic)?.id ? (
        <Button
          variant={(source ?? topic)?.isSubscribed ? "secondary" : "primary"}
          style={{ minWidth: "6rem", marginTop: "1rem" }}
          onClick={handleToggle}
        >
          {(source ?? topic)?.isSubscribed ? "Gefolgt" : "Folgen"}
        </Button>
      ) : null}
      <Flex
        justify="center"
        style={{ flexWrap: "wrap", margin: "2rem", maxWidth: "40rem" }}
      >
        {searchTermsQueryData?.searchTerms?.length
          ? searchTermsQueryData.searchTerms
              .map((term) =>
                term.term ? (
                  <Button
                    key={term.id}
                    onClick={() => {
                      navigate(`/explore?term=${term.id}`)
                    }}
                    ghost
                  >
                    {term.term}
                  </Button>
                ) : null
              )
              .filter(Boolean)
          : null}
      </Flex>
    </Flex>
  )
}
