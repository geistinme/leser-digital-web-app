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
import { useIsDevice } from "../../hooks/isDevice"

import styles from "./Article.module.scss"

import { ArticleImage, ArticleMenu } from "./"

interface ArticlePostProps {
  article: ArticleFeedFragment | ArticleListFragment
  list?: boolean
  loggedIn?: boolean
  ref?: (node: HTMLDivElement | null) => void
}

export const ArticlePost: React.FC<ArticlePostProps> = ({
  article,
  list,
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
      className={classNames(styles.header, { [styles.list]: list })}
    >
      <Flex gap="sm">
        <div className={styles.sourceLogo}>
          <img
            src={article.source.logo}
            onClick={() => navigate("/" + article.source.key)}
          />
        </div>
        {(article as ArticleFeedFragment).topic?.category !==
          ArticleCategory.Unknown && list ? (
          <Typography.Text disabled>{article.topic.name}</Typography.Text>
        ) : null}
        {article.premium && !list ? (
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

  const imageDimensions = useMemo(() => {
    if (isMobile && list) {
      return {
        width: "8rem",
        height: "8rem",
      }
    } else if (isMobile) {
      return {
        // For mobile, we want the image height to be 4:3 and adjust with the width
        height: "calc(100vw * 0.75)",
      }
    } else if (list) {
      return {
        width: "10rem",
        height: "10rem",
      }
    }
  }, [list, isMobile])

  return (
    <Flex
      direction={list ? "row" : "column"}
      align="start"
      gap={isMobile && list ? "xs" : "sm"}
      key={article.id}
      className={classNames(styles.article, { [styles.list]: list })}
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
    >
      <ArticleImage
        article={article}
        height={imageDimensions?.height}
        width={imageDimensions?.width}
        onClick={() => handleViewArticle({ article })}
      />
      <Flex gap="sm" className={styles.tags}>
        {article.activity?.find(
          (a) => a.type === ArticleActivityType.ViewArticle
        ) && !list ? (
          <Tag
            size="sm"
            variant="filled"
            color="var(--color-accent)"
            label="Gelesen"
            className={classNames(styles.category)}
          />
        ) : (article as ArticleFeedFragment).topic?.category !==
            ArticleCategory.Unknown && !list ? (
          <Tag
            size="sm"
            variant="filled"
            color="transparent"
            label={(article as ArticleFeedFragment).topic?.name}
            className={classNames(styles.category)}
          />
        ) : null}
      </Flex>
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
            {article.description && !list ? (
              <Typography.Paragraph className={styles.description}>
                {decodeHtmlEntities(article.description)}
              </Typography.Paragraph>
            ) : null}
          </a>
          {(article as ArticleFeedFragment).keywords?.length ? (
            <Flex gap="sm">
              {(article as ArticleFeedFragment).keywords?.map((keyword) => (
                <Typography.Text
                  size="xs"
                  key={keyword}
                  className={styles.keyword}
                  onClick={() => {
                    navigate(`/search?search=${keyword}`)
                  }}
                >
                  {keyword}
                </Typography.Text>
              ))}
            </Flex>
          ) : null}
          <Flex
            gap="sm"
            align="center"
            justify="between"
            style={{ width: "100%" }}
          >
            {!list && (
              <Typography.Text
                title={new Date(article.uploadedAt).toLocaleString()}
                size="xs"
                bold
                disabled
              >
                {moment(article.uploadedAt).fromNow()}
              </Typography.Text>
            )}
            <Flex gap="sm">
              {article.premium && list && isMobile ? (
                <Typography.Text size="xs" variant="warning" bold>
                  Premium
                </Typography.Text>
              ) : null}
              {article.views && !list ? (
                <Flex gap="xs" align="center">
                  <Eye color="#ccc" size={18} />
                  <Typography.Text size="xs" bold disabled>
                    {article.views}
                  </Typography.Text>
                </Flex>
              ) : null}
            </Flex>
          </Flex>
        </Flex>
      </Spacing>
    </Flex>
  )
}
