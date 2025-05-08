import React, { useMemo } from "react"

import { Column, Flex, Row, Spacing, Typography } from "@sampled-ui/base"
import moment from "moment"
import { useNavigate } from "react-router"

import {
  ArticleFeedFragment,
  ArticleGridFragment,
} from "../../../../generated/graphql"
import { decodeHtmlEntities } from "../../../shared/helpers"

import { useCreateViewActivity } from "../../../shared/hooks/Article/createViewActivity"
import styles from "./Article.module.scss"
import ArticleImage from "./ArticleImage"

interface ArticleGridProps {
  articles?: (ArticleGridFragment | ArticleFeedFragment)[] | null
  compact?: boolean
  loading?: boolean
  lastRef?: (node: HTMLDivElement | null) => void
}

const ArticleGridItem: React.FC<{
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

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading: loadingArticles,
  compact,
  lastRef,
}) => {
  const empty = useMemo(() => {
    if ((!articles || articles.length === 0) && !loadingArticles) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine Artikel gefunden
        </Typography.Text>
      )
    } else {
      return null
    }
  }, [articles, loadingArticles])

  const gridRows = useMemo(() => {
    return articles?.reduce((allRows, _currentArticle, index, allArticles) => {
      const row = []
      const columns = 3
      for (let i = 0; i < columns; i++) {
        if (allArticles[index + i]) {
          row.push(allArticles[index + i])
        }
      }
      if (
        (index === 0 || index % 3 === 0) &&
        row.filter((a) => !!a).length === 3
      ) {
        return [...allRows, row]
      }
      return allRows
    }, [] as ArticleGridFragment[][])
  }, [articles])

  const handleViewArticle = useCreateViewActivity()

  return (
    <Flex direction="column" align="stretch" gap="md" style={{ width: "100%" }}>
      {empty}
      {gridRows?.map((row, index) => (
        <Row
          key={`row-${index}`}
          ref={
            index === gridRows.length - 1 && lastRef
              ? (lastRef as unknown as React.RefObject<HTMLDivElement>)
              : undefined
          }
          gap={"1rem"}
        >
          <Column span={8}>
            <ArticleGridItem
              compact={compact}
              article={row[0]}
              onViewArticle={() => handleViewArticle({ article: row[0] })}
            />
          </Column>
          <Column span={8}>
            <ArticleGridItem
              compact={compact}
              article={row[1]}
              onViewArticle={() => handleViewArticle({ article: row[1] })}
            />
          </Column>
          <Column span={8}>
            <ArticleGridItem
              compact={compact}
              article={row[2]}
              onViewArticle={() => handleViewArticle({ article: row[2] })}
            />
          </Column>
        </Row>
      ))}
    </Flex>
  )
}

export default ArticleGrid
