import React, { useMemo } from "react";

import { Flex, Skeleton, Typography } from "@sampled-ui/base";

import {
  ArticleFeedFragment,
  useLoggedInQuery,
} from "../../../../generated/graphql";

import ArticleShowcase from "./ArticleShowcase";

interface ArticleFeedProps {
  articles?: ArticleFeedFragment[] | null;
  loading?: boolean;
}

const ArticleFeed: React.FC<ArticleFeedProps> = ({
  articles,
  loading: loadingArticles,
}) => {
  const { data: loggedInData } = useLoggedInQuery();

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

  const loading = useMemo(() => {
    if (loadingArticles) {
      return (
        <Flex
          direction="column"
          align="stretch"
          gap="lg"
          style={{ width: "100%" }}
        >
          <Flex
            direction="column"
            align="start"
            gap="md"
            style={{ width: "100%" }}
          >
            <Skeleton width="100%" height="20rem" />
            <Skeleton width="40%" height="1rem" />
            <Skeleton width="80%" height="1rem" />
            <Skeleton width="100%" height="2rem" />
          </Flex>
          <Skeleton width="100%" height="20rem" />
          <Skeleton width="100%" height="20rem" />
        </Flex>
      );
    } else {
      return null;
    }
  }, [loadingArticles]);

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ width: "fit-content", margin: "auto" }}
    >
      {empty}
      {loading}
      {articles?.map((article) => {
        return (
          <ArticleShowcase
            key={article.id}
            article={article}
            loggedIn={!!loggedInData?.loggedIn}
          />
        );
      })}
    </Flex>
  );
};

export default ArticleFeed;
