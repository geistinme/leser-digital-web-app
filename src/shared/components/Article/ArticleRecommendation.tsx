import React from "react";

import { Flex, Typography } from "@sampled-ui/base";

import { RecommendedArticleFragment } from "../../../../generated/graphql";
import { decodeHtmlEntities } from "../../../shared/helpers";

import styles from "./Article.module.scss";

interface ArticleRecommendationProps {
  article: RecommendedArticleFragment;
}

const ArticleRecommendation: React.FC<ArticleRecommendationProps> = ({
  article,
}) => {
  return (
    <Flex direction="column" gap="sm" align="start">
      <a
        href={article.url}
        target="_blank"
        style={{ all: "unset", cursor: "pointer" }}
      >
        <Typography.Text size="sm" bold className={styles.title}>
          {decodeHtmlEntities(article.title)}
        </Typography.Text>
      </a>
      <Typography.Text size="xs" variant="secondary">
        von {article.source.name}
      </Typography.Text>
    </Flex>
  );
};

export default ArticleRecommendation;
