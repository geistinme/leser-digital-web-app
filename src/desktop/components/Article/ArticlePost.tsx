import React from "react";

import { Flex, Spacing, Tag, Typography } from "@sampled-ui/base";
import classNames from "classnames";
import { toSentenceCase } from "js-convert-case";
import moment from "moment";
import { useNavigate } from "react-router";

import {
  ArticleFeedFragment,
  ArticleListFragment,
} from "../../../../generated/graphql";
import { decodeHtmlEntities } from "../../../shared/helpers";

import styles from "./Article.module.scss";
import ArticleImage from "./ArticleImage";
import ArticleMenu from "./ArticleMenu";
import { useCreateViewActivity } from "./hooks/createViewActivity";

interface ArticlePostProps {
  article: ArticleFeedFragment | ArticleListFragment;
  compact?: boolean;
  loggedIn?: boolean;
  ref?: (node: HTMLDivElement | null) => void;
}

const ArticlePost: React.FC<ArticlePostProps> = ({
  article,
  compact,
  loggedIn,
  ref,
}) => {
  const navigate = useNavigate();

  const handleViewArticle = useCreateViewActivity();

  const header = (
    <Flex
      gap="sm"
      justify="between"
      className={classNames(styles.header, { [styles.compact]: compact })}
    >
      <Flex gap="sm">
        <img
          src={article.source.logo}
          onClick={() => navigate("/" + article.source.key)}
          className={styles.sourceLogo}
        />
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
  );

  return (
    <Flex
      direction={compact ? "row" : "column"}
      align="start"
      gap="sm"
      key={article.id}
      className={classNames(styles.article, { [styles.compact]: compact })}
      ref={ref as unknown as React.RefObject<HTMLDivElement>}
    >
      <ArticleImage
        compact={compact}
        article={article}
        onClick={() => handleViewArticle({ article })}
      />
      {!compact && (article as ArticleFeedFragment).topic.category ? (
        <Tag
          size="sm"
          variant="filled"
          color="transparent"
          label={toSentenceCase(
            (article as ArticleFeedFragment).topic.category
          )}
          className={classNames(styles.category)}
        />
      ) : null}
      <Spacing gap="sm" className={styles.content}>
        <Flex direction="column" align="start" gap="sm">
          {header}
          <a
            href={article.url}
            target="_blank"
            style={{ all: "unset" }}
            onClick={() => handleViewArticle({ article })}
          >
            <Typography.Text bold size="md" className={styles.title}>
              {decodeHtmlEntities(article.title)}
            </Typography.Text>
            {article.description && !compact ? (
              <Typography.Paragraph className={styles.description}>
                {decodeHtmlEntities(article.description)}
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

export default ArticlePost;
