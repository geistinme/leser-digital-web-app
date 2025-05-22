import React from "react"

import { Flex, useToast } from "@sampled-ui/base"
import { Bookmark, Link } from "lucide-react"

import {
  ArticleActivityType,
  ArticleFeedFragment
} from "../../../../generated/graphql"
import { useColorScheme } from "../../../shared/hooks/colorScheme"
import { useToggleSaveArticle } from "../../hooks/Article/toggleSaveArticle"

import styles from "./Article.module.scss"

interface ArticleMenuProps {
  activity?: ArticleFeedFragment["activity"] | null
  id: string
  url: string
}

export const ArticleMenu: React.FC<ArticleMenuProps> = ({
  activity,
  id,
  url,
}) => {
  const { colorScheme } = useColorScheme()
  const { toast } = useToast()
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    toast({
      message: "Link wurde kopiert",
    })
  }

  const toggleSaveArticle = useToggleSaveArticle({
    activity,
    id,
  })

  return (
    <Flex gap="sm">
      <Bookmark
        size={20}
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
        onClick={toggleSaveArticle}
      />
      <Link size={20} className={styles.action} onClick={handleCopyLink} />
    </Flex>
  )
}