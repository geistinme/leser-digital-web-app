import { useCallback } from "react"

import { detect } from "detect-browser"
import { useNavigate } from "react-router"

import { Article } from "../../../../generated/graphql"
import { useIsDevice } from "../isDevice"

export const useReadArticle = () => {
  const navigate = useNavigate()
  const { isMobile } = useIsDevice()

  const readArticle = useCallback(
    (article: Pick<Article, "id" | "url">) => {
      const browser = detect()
      if (browser?.name === "firefox" || !isMobile) {
        window.open(article.url, "_blank")
      } else {
        navigate(`/read/${article.id}`)
      }
    },
    [isMobile, navigate]
  )

  return readArticle
}
