import React from "react";

import { Spacing } from "@sampled-ui/base";

import { useArticlesQuery } from "../../../generated/graphql";
import ArticleFeed from "../components/Article/ArticleFeed";

export const HomePage: React.FC = () => {
  const { data } = useArticlesQuery();
  return (
    <Spacing
      gap="xl"
      style={{ margin: "auto", marginTop: "2rem", width: "max-content" }}
    >
      <ArticleFeed articles={data?.articles} />
    </Spacing>
  );
};
