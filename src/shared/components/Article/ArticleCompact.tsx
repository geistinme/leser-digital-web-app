import { Flex, Spacing, Tag, Typography } from "@sampled-ui/base"
import classNames from "classnames"
import moment from "moment"
import { useNavigate } from "react-router"

import { ArticleActivityType, ArticleFeedFragment, ArticleGridFragment } from "../../../../generated/graphql"
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
    <Flex direction="column" className={styles.grid}>
      <ArticleImage
        article={article}
        height="12rem"
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
      <Spacing
        gap="sm"
        style={{
          width: "calc(100% - 1rem)",
          height: "100%",
        }}
      >
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
          <Typography.Text
            title={new Date(article.uploadedAt).toLocaleString()}
            size="xs"
            bold
            disabled
            style={{ justifySelf: "end" }}
          >
            {moment(article.uploadedAt).fromNow()}
          </Typography.Text>
        </Flex>
      </Spacing>
    </Flex>
  )
}