import { Flex, Spacing, Tag, Typography } from "@sampled-ui/base"
import classNames from "classnames"
import { Text } from "lucide-react"
import moment from "moment"
import { useNavigate } from "react-router"

import {
  ArticleActivityType,
  ArticleFeedFragment,
  ArticleGridFragment,
} from "../../../../generated/graphql"
import { decodeHtmlEntities } from "../../helpers"

import styles from "./Article.module.scss"
import { ArticleImage } from "./ArticleImage"

export const ArticleCompact: React.FC<{
  article: ArticleGridFragment | ArticleFeedFragment
  onViewArticle?: () => void
  compact?: boolean
}> = ({ article, compact, onViewArticle }) => {
  const navigate = useNavigate()

  return (
    <Flex direction="column" gap="xs" className={styles.grid}>
      <ArticleImage
        article={article}
        height="14rem"
        width="100%"
        style={{ borderRadius: "var(--border-radius-md)" }}
        onClick={onViewArticle}
      />
      <Flex gap="sm" className={styles.tags}>
        {article.activity?.find(
          (a) => a.type === ArticleActivityType.ViewArticle
        ) ? (
          <Tag
            size="sm"
            variant="filled"
            color="var(--color-accent)"
            label="Gelesen"
          />
        ) : (
          <Tag
            size="sm"
            variant="filled"
            color="transparent"
            label={(article as ArticleFeedFragment).topic.name}
            className={classNames(styles.category)}
          />
        )}
      </Flex>
      {article.description ? (
        <a
          href={article.url}
          target="_blank"
          onClick={onViewArticle}
          className={styles.imageOverlay}
        >
          <Spacing gap="sm">
            <Flex
              align="center"
              justify="center"
              className={styles.hasDescription}
            >
              <Text size={16} />
            </Flex>
            <Typography.Text className={styles.description}>
              {article.description}
            </Typography.Text>
          </Spacing>
        </a>
      ) : null}
      <Spacing gap="sm" className={styles.header}>
        <Flex
          direction="column"
          gap="sm"
          align="start"
          style={{ height: "100%" }}
        >
          {!compact && (article as ArticleFeedFragment).source.logo ? (
            <img
              src={(article as ArticleFeedFragment).source.logo}
              onClick={() =>
                navigate("/" + (article as ArticleFeedFragment).source.key)
              }
              className={styles.sourceLogo}
            />
          ) : null}
          <a
            href={article.url}
            target="_blank"
            style={{ all: "unset" }}
            onClick={onViewArticle}
          >
            <Typography.Text bold size="sm" className={styles.title}>
              {decodeHtmlEntities(article.title)}
            </Typography.Text>
          </a>
          <Flex gap="sm" style={{ width: "100%" }}>
            <Typography.Text
              title={new Date(article.uploadedAt).toLocaleString()}
              size="xs"
              bold
              disabled
              style={{ justifySelf: "end" }}
            >
              {moment(article.uploadedAt).fromNow()}
            </Typography.Text>
            {(article as ArticleFeedFragment).keywords?.length ? (
              <Flex align="center" gap="sm" className={styles.keywords}>
                {(article as ArticleFeedFragment).keywords
                  ?.slice(0, 3)
                  .map((keyword) => (
                    <Typography.Text
                      size="xs"
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
          </Flex>
        </Flex>
      </Spacing>
    </Flex>
  )
}
