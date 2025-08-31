import React from "react"

import { Card, Flex, Spacing, Typography } from "@sampled-ui/base"

import { useRecommendedArticlesQuery } from "../../../../generated/graphql"
import { useGreeting } from "../../../shared/hooks/greetings"
import ArticleList from "../Article/ArticleList"

const ExploreCallToAction: React.FC = () => {
  const [greeting] = useGreeting()
  const { data: recommendedArticlesQueryData } = useRecommendedArticlesQuery()

  const recommendations = (
    <Flex direction="column" gap="sm" align="start" style={{ width: "100%" }}>
      <Typography.Text size="sm" disabled bold>
        Von uns empfohlen
      </Typography.Text>
      {recommendedArticlesQueryData?.recommendedArticles.length ? (
        <ArticleList
          compact
          articles={recommendedArticlesQueryData.recommendedArticles}
        />
      ) : null}
    </Flex>
  )

  return (
    <Spacing gap="sm" style={{ maxWidth: "18rem" }}>
      <Flex direction="column" align="start">
        <Card>
          <Spacing gap="lg">
            <Flex direction="column" gap="sm" align="start">
              <Typography.Heading level={5}>
                {greeting ?? "Hello."}
              </Typography.Heading>
              {recommendedArticlesQueryData?.recommendedArticles?.length
                ? recommendations
                : null}
            </Flex>
          </Spacing>
        </Card>
        <Spacing gap="sm">
          <Flex>
            <Typography.Text size="xs" disabled>
              © {new Date().getFullYear()} LESER DIGITAL
            </Typography.Text>
          </Flex>
        </Spacing>
      </Flex>
    </Spacing>
  )
}

export default ExploreCallToAction
