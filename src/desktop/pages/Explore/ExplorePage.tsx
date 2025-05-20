import React, { useMemo } from "react";

import { Flex, Spacing } from "@sampled-ui/base";

import {
  useMostViewedArticlesQuery
} from "../../../../generated/graphql";
import ArticleShowcase from "../../../shared/components/Article/ArticleShowcase";
import ArticleGrid from "../../components/Article/ArticleGrid";

export const ExplorePage: React.FC = () => {
  const { data } = useMostViewedArticlesQuery();

  const mostViewedArticle = useMemo(
    () => (data?.mostViewedArticles ? data?.mostViewedArticles[0] : null),
    [data?.mostViewedArticles]
  );

  const allOtherArticles = useMemo(
    () =>
      data?.mostViewedArticles
        ? data?.mostViewedArticles.slice(1, data.mostViewedArticles.length)
        : null,
    [data?.mostViewedArticles]
  );

  return (
    <Spacing gap="xl">
      <title>Entdecken</title>
      <Flex
        gap="xl"
        direction="column"
        align="stretch"
        style={{ width: "100%", maxWidth: "64rem", margin: "auto" }}
      >
        {mostViewedArticle ? (
          <ArticleShowcase article={mostViewedArticle} />
        ) : null}
        {allOtherArticles ? <ArticleGrid articles={allOtherArticles} /> : null}
      </Flex>
    </Spacing>
  );
};
