import React from "react"

import { Bookmark } from "lucide-react"

import {
    ArticleActivity,
    ArticleActivityType,
} from "../../../../generated/graphql"
import { useToggleSaveArticle } from "../../hooks/Article/toggleSaveArticle"
import { useColorScheme } from "../../hooks/colorScheme"

import { useAuthRedirect } from "../PrivatePage/hooks"
import styles from "./Article.module.scss"

interface ArticleBookmarkProps {
  activity?: Pick<ArticleActivity, "id" | "type">[] | null
  id: string
}

export const ArticleBookmark: React.FC<ArticleBookmarkProps> = ({
  activity,
  id,
}) => {
  const { colorScheme } = useColorScheme()
  const toggleSaveArticle = useToggleSaveArticle({ activity, id })
  const { loggedIn, redirect } = useAuthRedirect()

  return (
    <Bookmark
      className={styles.action}
      fill={
        activity?.find(
          (activity) => activity?.type === ArticleActivityType.SaveArticle
        )
          ? "dodgerblue"
          : colorScheme === "dark"
          ? "black"
          : "white"
      }
      color={
        activity?.find(
          (activity) => activity?.type === ArticleActivityType.SaveArticle
        )
          ? "dodgerblue"
          : undefined
      }
      onClick={() => {
        if (!loggedIn) {
          redirect()
        } else {
          toggleSaveArticle()
        }
      }}
    />
  )
}
