import React from "react"

import { Card, Flex, Spacing, Typography } from "@sampled-ui/base"

import { useRecommendedArticlesQuery } from "../../../../generated/graphql"
import { ArticleRecommendation } from "../../../shared/components"
import { useGreeting } from "../../../shared/hooks/greetings"

const ExploreCallToAction: React.FC = () => {
  const [greeting, randomQuote] = useGreeting()
  const { data: recommendedArticlesQueryData } = useRecommendedArticlesQuery()

  const recommendations = (
    <Flex direction="column" gap="sm" align="start">
      <Typography.Text size="sm" variant="secondary" bold>
        Unsere Empfehlungen
      </Typography.Text>
      {recommendedArticlesQueryData?.recommendedArticles?.map((article) => (
        <ArticleRecommendation article={article!} key={article?.id} />
      ))}
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
              {randomQuote ? (
                <Typography.Paragraph>{randomQuote}</Typography.Paragraph>
              ) : null}
            </Flex>
            {recommendedArticlesQueryData?.recommendedArticles?.length
              ? recommendations
              : null}
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
