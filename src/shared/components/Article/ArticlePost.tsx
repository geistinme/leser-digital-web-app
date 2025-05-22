import React, { useMemo } from "react"

import { Flex, Spacing, Tag, Typography } from "@sampled-ui/base"
import classNames from "classnames"
import { Eye } from "lucide-react"
import moment from "moment"
import { useNavigate } from "react-router"

import {
  ArticleActivityType,
  ArticleCategory,
  ArticleFeedFragment,
  ArticleListFragment,
} from "../../../../generated/graphql"
import { decodeHtmlEntities } from "../../../shared/helpers"
import { useCreateViewActivity } from "../../../shared/hooks/Article/createViewActivity"

import styles from "./Article.module.scss"

import { useIsDevice } from "../../hooks/isDevice"
import { ArticleImage, ArticleMenu } from "./"

interface ArticlePostProps {
  article: ArticleFeedFragment | ArticleListFragment
  compact?: boolean
  loggedIn?: boolean
  ref?: (node: HTMLDivElement | null) => void
}

export const ArticlePost: React.FC<ArticlePostProps> = ({
  article,
  compact,
  loggedIn,
  ref,
}) => {
  const navigate = useNavigate()
  const { isMobile } = useIsDevice()

  const handleViewArticle = useCreateViewActivity()

  const header = (
    <Flex
      gap="sm"
      justify="between"
      className={classNames(styles.header, { [styles.compact]: compact })}
    >
      <Flex gap="sm">
        <img
          src={article.source.logo}
          onClick={() => navigate("/" + article.source.key)}
          className={styles.sourceLogo}
        />
        {article.premium && !isMobile ? (
          <Typography.Text size="xs" variant="warning" bold>
            Premium
          </Typography.Text>
        ) : null}
      </Flex>
      {loggedIn ? (
        <ArticleMenu
          activity={article.activity}
          id={article.id}
          url={article.url}
        />
      ) : null}
    </Flex>
  )

  const compactImageDimensions = useMemo(() => {
    if (isMobile && compact) {
      return {
        width: "8rem",
        height: "8rem",
      }
    } else if (compact) {
      return {
        width: "10rem",
        height: "10rem",
      }
    }
  }, [compact, isMobile])

  return (
    <Flex
      direction={compact ? "row" : "column"}
      align="start"
      gap={isMobile && compact ? "xs" : "sm"}
      key={article.id}
      className={classNames(styles.article, { [styles.compact]: compact })}
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
    >
      <ArticleImage
        article={article}
        height={compact ? compactImageDimensions?.height : undefined}
        width={compact ? compactImageDimensions?.width : undefined}
        onClick={() => handleViewArticle({ article })}
      />
      {!compact ? (
        <Flex gap="sm" className={styles.tags}>
          {article.activity?.find(
            (a) => a.type === ArticleActivityType.ViewArticle
          ) ? (
            <Tag
              size="sm"
              variant="filled"
              color="var(--color-accent)"
              label="Gelesen"
              className={classNames(styles.category)}
            />
          ) : (article as ArticleFeedFragment).topic.category !==
            ArticleCategory.Unknown ? (
            <Tag
              size="sm"
              variant="filled"
              color="transparent"
              label={(article as ArticleFeedFragment).topic.name}
              className={classNames(styles.category)}
            />
          ) : null}
        </Flex>
      ) : null}
      <Spacing gap="sm" className={styles.content}>
        <Flex direction="column" align="start" gap="sm">
          {header}
          <a
            href={article.url}
            target="_blank"
            style={{ all: "unset" }}
            onClick={() => handleViewArticle({ article })}
          >
            <Typography.Text bold size="md" className={styles.title}>
              {decodeHtmlEntities(article.title)}
            </Typography.Text>
            {article.description && !compact ? (
              <Typography.Paragraph className={styles.description}>
                {decodeHtmlEntities(article.description)}
              </Typography.Paragraph>
            ) : null}
          </a>
          <Flex
            gap="sm"
            align="center"
            justify="between"
            style={{ width: "100%" }}
          >
            {!compact && (
              <Typography.Text
                title={new Date(article.uploadedAt).toLocaleString()}
                size="xs"
                bold
                disabled
              >
                {moment(article.uploadedAt).fromNow()}
              </Typography.Text>
            )}
            {article.premium && isMobile ? (
              <Typography.Text size="xs" variant="warning" bold>
                Premium
              </Typography.Text>
            ) : null}
            {article.views && !compact ? (
              <Flex gap="xs" align="center">
                <Eye color="#ccc" size={18} />
                <Typography.Text size="xs" bold disabled>
                  {article.views}
                </Typography.Text>
              </Flex>
            ) : null}
          </Flex>
        </Flex>
      </Spacing>
    </Flex>
  )
}
