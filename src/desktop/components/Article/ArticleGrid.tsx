import React, { useCallback, useMemo } from "react";

import { Column, Flex, Row, Spacing, Typography } from "@sampled-ui/base";
import moment from "moment";

import {
  ArticleActivityType,
  ArticleGridFragment,
  useCreateArticleActivityMutation,
  useLoggedInQuery,
} from "../../../../generated/graphql";

import { decodeHtmlEntities } from "../../../shared/helpers";
import styles from "./Article.module.scss";
import ArticleImage from "./ArticleImage";

interface ArticleGridProps {
  articles?: ArticleGridFragment[] | null;
  loading?: boolean;
}

const ArticleGridItem: React.FC<{
  article: ArticleGridFragment;
  onClick?: () => void;
}> = ({ article, onClick }) => {
  return (
    <Flex direction="column" className={styles.grid}>
      <ArticleImage
        article={article}
        height="10rem"
        width="100%"
        style={{ borderRadius: "initial" }}
      />
      <Spacing gap="sm" style={{ marginBottom: "0.5rem" }}>
        <Flex direction="column" align="start">
          <a
            href={article.url}
            target="_blank"
            style={{ all: "unset" }}
            onClick={onClick}
          >
            <Typography.Text bold size="md" className={styles.title}>
              {decodeHtmlEntities(article.title)}
            </Typography.Text>
          </a>
          <Typography.Text
            title={new Date(article.uploadedAt).toLocaleString()}
            size="xs"
            bold
            disabled
          >
            {moment(article.uploadedAt).fromNow()}
          </Typography.Text>
        </Flex>
      </Spacing>
    </Flex>
  );
};

const ArticleGrid: React.FC<ArticleGridProps> = ({
  articles,
  loading: loadingArticles,
}) => {
  const empty = useMemo(() => {
    if ((!articles || articles.length === 0) && !loadingArticles) {
      return (
        <Typography.Text disabled bold style={{ textAlign: "center" }}>
          Keine Artikel gefunden
        </Typography.Text>
      );
    } else {
      return null;
    }
  }, [articles, loadingArticles]);

  const gridRows = useMemo(() => {
    return articles?.reduce((allRows, _currentArticle, index, allArticles) => {
      const row = [];
      const columns = 3;
      for (let i = 0; i < columns; i++) {
        if (allArticles[index + i]) {
          row.push(allArticles[index + i]);
        }
      }
      if (
        (index === 0 || index % 3 === 0) &&
        row.filter((a) => !!a).length === 3
      ) {
        return [...allRows, row];
      }
      return allRows;
    }, [] as ArticleGridFragment[][]);
  }, [articles]);

  const { data: loggedInQueryData } = useLoggedInQuery();
  const [createArticleActivity] = useCreateArticleActivityMutation();

  const createActivity = useCallback(
    (id: number) => {
      return () => {
        if (loggedInQueryData?.loggedIn) {
          createArticleActivity({
            variables: {
              data: {
                articleId: id,
                type: ArticleActivityType.ViewArticle,
              },
            },
          });
        }
      };
    },
    [createArticleActivity, loggedInQueryData?.loggedIn]
  );

  return (
    <Flex direction="column" align="stretch" style={{ width: "100%" }}>
      {empty}
      {gridRows?.map((row, index) => (
        <Row
          key={`row-${index}`}
          style={{ marginBottom: "0.0625rem" }}
          gap={"0.0625rem"}
        >
          <Column span={8}>
            <ArticleGridItem
              article={row[0]}
              onClick={createActivity(row[0].id)}
            />
          </Column>
          <Column span={8}>
            <ArticleGridItem
              article={row[1]}
              onClick={createActivity(row[1].id)}
            />
          </Column>
          <Column span={8}>
            <ArticleGridItem
              article={row[2]}
              onClick={createActivity(row[2].id)}
            />
          </Column>
        </Row>
      ))}
    </Flex>
  );
};

export default ArticleGrid;
