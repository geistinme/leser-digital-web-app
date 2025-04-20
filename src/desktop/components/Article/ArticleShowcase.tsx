import React from "react";

import { Flex, Spacing, Typography } from "@sampled-ui/base";
import classNames from "classnames";
import moment from "moment";
import { useNavigate } from "react-router";

import {
  ArticleActivityType,
  ArticleFeedFragment,
  useCreateArticleActivityMutation,
} from "../../../../generated/graphql";
import { useColorScheme } from "../../../shared/hooks/colorScheme";

import ArticleMenu from "./ArticleMenu";
import styles from "./ArticleShowcase.module.scss";
import { invertLogo } from "./invertLogo";

interface ArticleShowcaseProps {
  article: ArticleFeedFragment;
  compact?: boolean;
  loggedIn?: boolean;
}

const ArticleShowcase: React.FC<ArticleShowcaseProps> = ({
  article,
  compact,
  loggedIn,
}) => {
  const navigate = useNavigate();
  const { colorScheme } = useColorScheme();
  const [createArticleActivity] = useCreateArticleActivityMutation();

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
          className={classNames(styles.sourceLogo, {
            [styles.invert]:
              colorScheme === "dark" && invertLogo(article.source.key),
          })}
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
    >
      <a
        href={article.url}
        target="_blank"
        onClick={() => {
          createArticleActivity({
            variables: {
              data: {
                articleId: article.id,
                type: ArticleActivityType.ViewArticle,
              },
            },
          });
        }}
        style={{
          all: "unset",
          height: compact ? "10rem" : "20rem",
          width: compact ? "10rem" : "100%",
        }}
      >
        <div
          style={{ backgroundImage: `url(${article.image})` }}
          className={classNames(styles.image, { [styles.compact]: compact })}
        />
      </a>
      <Spacing gap="sm" className={styles.content}>
        <Flex direction="column" align="start" gap="sm">
          {header}
          <a
            href={article.url}
            target="_blank"
            style={{ all: "unset" }}
            onClick={() => {
              createArticleActivity({
                variables: {
                  data: {
                    articleId: article.id,
                    type: ArticleActivityType.ViewArticle,
                  },
                },
              });
            }}
          >
            <Typography.Text bold size="md" className={styles.title}>
              {article.title}
            </Typography.Text>
            {article.description && !compact ? (
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
