import React from "react";

import { Flex } from "@sampled-ui/base";

import {
  ArticleListFragment,
  useLoggedInQuery,
} from "../../../../generated/graphql";

import ArticleShowcase from "./ArticleShowcase";

interface ArticleListProps {
  articles: ArticleListFragment[];
}

const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  const { data: loggedInQueryData } = useLoggedInQuery();

  return (
    <Flex
      direction="column"
      gap="lg"
      style={{ maxWidth: "40rem", width: "100%", margin: "auto" }}
    >
      {articles?.map((article) => (
        <ArticleShowcase
          article={article}
          key={article.id}
          loggedIn={!!loggedInQueryData?.loggedIn}
          compact
        />
      ))}
    </Flex>
  );
};

export default ArticleList;
