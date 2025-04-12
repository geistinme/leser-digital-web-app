import React from "react";

import { Flex, Spacing, Typography } from "@sampled-ui/base";

import { FeedArticleFragment } from "../../../../generated/graphql";

import moment from "moment";
import styles from "./ArticleShowcase.module.scss";

interface ArticleShowcaseProps {
  article: FeedArticleFragment;
}

const ArticleShowcase: React.FC<ArticleShowcaseProps> = ({ article }) => {
  return (
    <Flex
      direction="column"
      align="start"
      gap="md"
      key={article.id}
      className={styles.article}
      onClick={() => {
        window.open(article.url, "_blank");
      }}
    >
      <div
        style={{ backgroundImage: `url(${article.image})` }}
        className={styles.image}
      />
      <Spacing gap="sm" className={styles.content}>
        <Flex direction="column" align="start" gap="sm">
          <Flex gap="sm" justify="between" style={{ width: "100%" }}>
            <img src={article.source.logo} className={styles.sourceLogo} />
            {article.premium ? (
              <Typography.Text
                size="sm"
                variant="warning"
                bold
              >
                Premium
              </Typography.Text>
            ) : null}
          </Flex>
          <Typography.Text bold size="md">
            {article.title}
          </Typography.Text>
          {article.description ? (
            <Typography.Paragraph className={styles.description}>
              {article.description}
            </Typography.Paragraph>
          ) : null}
          <Typography.Text size="sm" disabled>
            {moment(article.uploadedAt).fromNow()}
          </Typography.Text>
        </Flex>
      </Spacing>
    </Flex>
  );
};

export default ArticleShowcase;
