import React from "react";

import { Flex } from "@sampled-ui/base";

import {
  ArticleFeedFragment,
  useLoggedInQuery,
} from "../../../../generated/graphql";

import ArticleShowcase from "./ArticleShowcase";

interface ArticleFeedProps {
  articles?: ArticleFeedFragment[] | null;
}

const ArticleFeed: React.FC<ArticleFeedProps> = ({ articles }) => {
  const { data: loggedInData } = useLoggedInQuery();
  if (!articles || articles.length === 0) {
    return <div>No articles available</div>;
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ width: "fit-content", margin: "auto" }}
    >
      {articles.map((article) => {
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
