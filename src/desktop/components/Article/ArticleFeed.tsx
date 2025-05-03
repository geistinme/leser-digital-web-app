import React from "react";

import { Flex } from "@sampled-ui/base";

import {
  ArticleFeedFragment,
  useLoggedInQuery,
} from "../../../../generated/graphql";

import ArticlePost from "./ArticlePost";

interface ArticleFeedProps {
  articles?: ArticleFeedFragment[] | null;
  lastRef: (node: HTMLDivElement | null) => void;
}

const ArticleFeed: React.FC<ArticleFeedProps> = ({ articles, lastRef }) => {
  const { data: loggedInData } = useLoggedInQuery();

  return (
    <Flex
      direction="column"
      align="stretch"
      style={{ width: "100%", maxWidth: "30rem", margin: "auto" }}
    >
      {articles?.map((article, index) => {
        return (
          <ArticlePost
            key={article.id}
            article={article}
            loggedIn={!!loggedInData?.loggedIn}
            ref={index === articles.length - 1 ? lastRef : undefined}
          />
        );
      })}
    </Flex>
  );
};

export default ArticleFeed;
