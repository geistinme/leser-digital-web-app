import React from "react";

import { Flex, Spacing, Typography } from "@sampled-ui/base";
import moment from "moment";

import { FeedArticleFragment } from "../../../../generated/graphql";

import ArticleMenu from "./ArticleMenu";
import styles from "./ArticleShowcase.module.scss";

interface ArticleShowcaseProps {
  article: FeedArticleFragment;
  loggedIn: boolean;
}

const ArticleShowcase: React.FC<ArticleShowcaseProps> = ({
  article,
  loggedIn,
}) => {
  return (
    <Flex
      direction="column"
      align="start"
      gap="sm"
      key={article.id}
      className={styles.article}
    >
      <a
        href={article.url}
        target="_blank"
        style={{ all: "unset", height: "20rem", width: "100%" }}
      >
        <div
          style={{ backgroundImage: `url(${article.image})` }}
          className={styles.image}
        />
      </a>
      <Spacing gap="sm" className={styles.content}>
        <Flex direction="column" align="start" gap="sm">
          <Flex gap="sm" justify="between" style={{ width: "100%" }}>
            <Flex gap="sm">
              <img src={article.source.logo} className={styles.sourceLogo} />
              {article.premium ? (
                <Typography.Text size="xs" variant="warning" bold>
                  Premium
                </Typography.Text>
              ) : null}
            </Flex>
            {loggedIn ? (
              <ArticleMenu
                activity={article.activity}
                id={article.id}
                url={article.url}
              />
            ) : null}
          </Flex>
          <a href={article.url} target="_blank" style={{ all: "unset" }}>
            <Typography.Text bold size="md" className={styles.title}>
              {article.title}
            </Typography.Text>
            {article.description ? (
              <Typography.Paragraph className={styles.description}>
                {article.description}
              </Typography.Paragraph>
            ) : null}
          </a>
          <Typography.Text
            title={new Date(article.uploadedAt).toLocaleString()}
            size="xs"
            bold
            disabled
          >
            {moment(article.uploadedAt).fromNow()}
          </Typography.Text>
        </Flex>
      </Spacing>
    </Flex>
  );
};

export default ArticleShowcase;
