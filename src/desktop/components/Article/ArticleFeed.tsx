import React from "react";

import { Flex } from "@sampled-ui/base";

import { FeedArticleFragment } from "../../../../generated/graphql";

import ArticleShowcase from "./ArticleShowcase";

interface ArticleFeedProps {
  articles?: FeedArticleFragment[] | null;
}

const ArticleFeed: React.FC<ArticleFeedProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return <div>No articles available</div>;
  }

  return (
    <Flex
      direction="column"
      align="stretch"
      gap="xl"
      style={{ width: "fit-content", margin: "auto" }}
    >
      {articles.map((article) => {
        return <ArticleShowcase article={article} />;
      })}
    </Flex>
  );
};

export default ArticleFeed;
