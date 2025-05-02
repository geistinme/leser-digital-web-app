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

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ width: "100%", maxWidth: "30rem", margin: "auto" }}
    >
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
