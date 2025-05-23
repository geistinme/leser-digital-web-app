import React from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"
import { useNavigate } from "react-router"

import { ArticleFeedFragment } from "../../../../generated/graphql"
import { decodeHtmlEntities } from "../../helpers"
import { useCreateViewActivity } from "../../hooks/Article/createViewActivity"
import { useIsDevice } from "../../hooks/isDevice"

import styles from "./Article.module.scss"
import { ArticleImage } from "./ArticleImage"

interface ArticleShowcaseProps {
  article: ArticleFeedFragment
}

export const ArticleShowcase: React.FC<ArticleShowcaseProps> = ({
  article,
}) => {
  const navigate = useNavigate()
  const { isMobile } = useIsDevice()
  const handleViewArticle = useCreateViewActivity()

  return (
    <div className={styles.showcase}>
      <ArticleImage
        article={article}
        height={isMobile ? "28rem" : "40rem"}
        width="100%"
        style={{
          border: "initial",
          borderRadius: "initial",
          backgroundPosition: "center",
        }}
        onClick={() => handleViewArticle({ article })}
      />
      <div
        className={styles.sourceLogoBox}
        onClick={() => navigate("/" + article.source.key)}
      >
        <img src={article.source.logo} />
      </div>
      <div
        className={styles.overlay}
        onClick={() => {
          window.open(article.url, "_blank")
          handleViewArticle({ article })
        }}
      >
        <Spacing gap="md">
          <Flex
            direction="column"
            gap="sm"
            style={{
              maxWidth: "50ch",
              margin: "auto",
            }}
          >
            <Typography.Heading level={isMobile ? 5 : 4}>
              {decodeHtmlEntities(article.title)}
            </Typography.Heading>
            <Typography.Text size={isMobile ? "sm" :"md"}>
              {article.description
                ? decodeHtmlEntities(article.description)
                : null}
            </Typography.Text>
          </Flex>
        </Spacing>
      </div>
    </div>
  )
}
