import React, { useMemo } from "react"

import { Column, Flex, Row, Typography } from "@sampled-ui/base"

import {
  ArticleFeedFragment,
  ArticleGridFragment,
} from "../../../../generated/graphql"
import { ArticleCompact } from "../../../shared/components/Article/ArticleCompact"
import { useCreateViewActivity } from "../../../shared/hooks/Article/createViewActivity"

interface ArticleGridProps {
  articles?: (ArticleGridFragment | ArticleFeedFragment)[] | null
  compact?: boolean
  loading?: boolean
  lastRef?: (node: HTMLDivElement | null) => void
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
        index === 0 ||
        index % columns === 0 ||
        allArticles[index] === undefined
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
          {row[0] && (
            <Column span={8}>
              <ArticleCompact
                compact={compact}
                article={row[0]}
                onViewArticle={() => handleViewArticle({ article: row[0] })}
              />
            </Column>
          )}
          {row[1] && (
            <Column span={8}>
              <ArticleCompact
                compact={compact}
                article={row[1]}
                onViewArticle={() => handleViewArticle({ article: row[1] })}
              />
            </Column>
          )}
          {row[2] && (
            <Column span={8}>
              <ArticleCompact
                compact={compact}
                article={row[2]}
                onViewArticle={() => handleViewArticle({ article: row[2] })}
              />
            </Column>
          )}
        </Row>
      ))}
    </Flex>
  )
}

export default ArticleGrid
