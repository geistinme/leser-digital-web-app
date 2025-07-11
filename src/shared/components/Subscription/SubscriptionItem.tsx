import React, { useEffect, useState } from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"
import classNames from "classnames"
import { toKebabCase } from "js-convert-case"
import { CheckIcon, PlusIcon } from "lucide-react"
import { Vibrant } from "node-vibrant/browser"
import { useNavigate } from "react-router"

import {
  SearchDocument,
  SourceGridFragment,
  SubscriptionsDocument,
  TopicGridFragment,
  UserSubscriptionFragment,
} from "../../../../generated/graphql"
import PreloadImage from "../../../shared/components/PreloadImage"
import { useToggleSubscription } from "../../../shared/hooks/Subscription/toggleSubscription"

import styles from "./Subscription.module.scss"

interface SubscriptionItemProps {
  term?: UserSubscriptionFragment["searchTerm"]
  source?: SourceGridFragment | TopicGridFragment
  userSubscription?: UserSubscriptionFragment
}

export const SubscriptionItem: React.FC<SubscriptionItemProps> = ({
  term,
  source,
  userSubscription,
}) => {
  const [backgroundColor, setBackgroundColor] = useState<string | undefined>(
    undefined
  )
  const navigate = useNavigate()

  useEffect(() => {
    Vibrant.from((source as SourceGridFragment)?.logo ?? source?.banner)
      .getPalette()
      .then((palette) => {
        if (source && "logo" in source) {
          const hex = palette.Vibrant?.hex
          setBackgroundColor(hex)
        }
      })
      .catch((error) => {
        console.error("Error fetching palette:", error)
      })
  }, [source])

  const { handleToggle } = useToggleSubscription({
    createVariables: term?.id
      ? { termId: term.id }
      : source?.__typename === "Source"
      ? { sourceId: source?.id }
      : { topicId: source?.id },
    subscription: userSubscription,
    refetchQueries: [SearchDocument, SubscriptionsDocument],
  })

  return (
    <div className={styles.item} title={source?.name}>
      <Flex
        direction="column"
        style={{ height: "100%", width: "100%", backgroundColor }}
      >
        {source?.banner ? (
          <PreloadImage
            src={source?.banner}
            className={styles.banner}
            width="100%"
            height="100%"
            backgroundPosition="center 30%"
            backgroundSize="cover"
            onClick={() => {
              if (term?.term) {
                navigate(`/search/?term=${term.id}`)
              } else {
                if (source?.__typename === "Source") {
                  navigate(`/${source?.key}`)
                } else if (source?.__typename === "Topic") {
                  navigate(`/t/${toKebabCase(source?.category)}`)
                }
              }
            }}
          />
        ) : null}
        {term?.term ? (
          <Flex
            direction="column"
            justify="center"
            style={{ height: "100%" }}
            className={styles.term}
            onClick={() => {
              if (term.source || term.topic) {
                if (term.source) {
                  navigate(`/${term?.source.key}`)
                } else if (term.topic) {
                  navigate(`/t/${toKebabCase(term.topic.category)}`)
                }
              } else if (term?.term) {
                navigate(`/search/?term=${term.id}`)
              } else {
                if (source?.__typename === "Source") {
                  navigate(`/${source?.key}`)
                } else if (source?.__typename === "Topic") {
                  navigate(`/t/${toKebabCase(source?.category)}`)
                }
              }
            }}
          >
            <Typography.Heading level={3}>{term.term}</Typography.Heading>
          </Flex>
        ) : null}
        <Flex
          align="center"
          justify="center"
          className={classNames({
            [styles.logo]: source && "logo" in source,
            [styles.name]: !source || !("logo" in source),
          })}
          onClick={() => {
            if (term?.term) {
              navigate(`/search/?term=${term.id}`)
            } else {
              if (source?.__typename === "Source") {
                navigate(`/${source?.key}`)
              } else if (source?.__typename === "Topic") {
                navigate(`/t/${toKebabCase(source?.category)}`)
              }
            }
          }}
        >
          {source && "logo" in source ? (
            <img src={source?.logo} />
          ) : (
            <Flex>
              {source?.name ? (
                <Spacing gap="sm">
                  <Flex direction="column">
                    <Typography.Text size="lg">
                      {term?.term
                        ? `${term.term} in ${source.name}`
                        : source.name}
                    </Typography.Text>
                  </Flex>
                </Spacing>
              ) : (
                <Typography.Text size="lg">in Suche</Typography.Text>
              )}
            </Flex>
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
  )
}

export default SubscriptionItem
