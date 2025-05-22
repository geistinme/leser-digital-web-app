import React from "react"

import { Flex, Spacing } from "@sampled-ui/base"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useParams } from "react-router"

import { useArticleQuery } from "../../../../generated/graphql"
import { ArticleBookmark } from "../../../shared/components/Article/ArticleBookmark"

interface ReaderPageProps {}

export const ReaderPage: React.FC<ReaderPageProps> = () => {
  const navigate = useNavigate()

  const { article } = useParams<{ article: string }>()
  const { data: articleQueryData } = useArticleQuery({
    variables: { id: article as string },
  })

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <Spacing gap="lg">
        <Flex style={{ width: "100%" }} justify="between">
          <ArrowLeft onClick={() => navigate(-1)} />
          {articleQueryData?.article?.id ? (
            <ArticleBookmark
              activity={articleQueryData?.article?.activity}
              id={articleQueryData?.article?.id}
            />
          ) : null}
        </Flex>
      </Spacing>
      <iframe
        src={articleQueryData?.article?.url}
        width="100%"
        height="100%"
        style={{ border: "initial" }}
      />
    </div>
  )
}
