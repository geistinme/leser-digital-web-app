import React from "react";

import { Flex, Spacing, Typography } from "@sampled-ui/base";
import { useNavigate } from "react-router";

import { ArticleFeedFragment } from "../../../../generated/graphql";
import { decodeHtmlEntities } from "../../../shared/helpers";

import styles from "./Article.module.scss";
import ArticleImage from "./ArticleImage";

interface ArticleShowcaseProps {
  article: ArticleFeedFragment;
}

const ArticleShowcase: React.FC<ArticleShowcaseProps> = ({ article }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.showcase}>
      <ArticleImage
        article={article}
        height="40rem"
        width="100%"
        style={{
          border: "initial",
          borderRadius: "initial",
          backgroundPosition: "center",
        }}
      />
      <div
        className={styles.sourceLogoBox}
        onClick={() => navigate("/" + article.source.key)}
      >
        <img src={article.source.logo} />
      </div>
      <div className={styles.overlay}>
        <Spacing gap="md">
          <Flex
            direction="column"
            gap="sm"
            style={{
              maxWidth: "50ch",
              margin: "auto",
            }}
          >
            <Typography.Heading level={4}>
              {decodeHtmlEntities(article.title)}
            </Typography.Heading>
            <Typography.Text>
              {article.description
                ? decodeHtmlEntities(article.description)
                : null}
            </Typography.Text>
          </Flex>
        </Spacing>
      </div>
    </div>
  );
};

export default ArticleShowcase;
