import React from "react"

import { Flex, useToast } from "@sampled-ui/base"
import { Bookmark, Link, Star, Trash } from "lucide-react"
import { useLocation } from "react-router"

import {
  ArticleActivityType,
  ArticleFeedFragment,
  RecommendedArticlesDocument,
  Role,
  useCreateArticleActivityMutation,
  useDeleteArticleActivityMutation,
  useLoggedInQuery,
  useToggleRecommendArticleMutation,
} from "../../../../generated/graphql"
import { useColorScheme } from "../../../shared/hooks/colorScheme"

import styles from "./Article.module.scss"

interface ArticleMenuProps {
  recommended: boolean
  activity?: ArticleFeedFragment["activity"] | null
  id: string
  url: string
  compact?: boolean
}

export const ArticleMenu: React.FC<ArticleMenuProps> = ({
  activity,
  id,
  url,
  recommended,
  compact,
}) => {
  const location = useLocation()
  const search = new URLSearchParams(location.search)
  const tab = search.get("tab")

  const { colorScheme } = useColorScheme()
  const { toast } = useToast()

  // Function to copy the article link to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url)
    toast({
      message: "Link wurde kopiert",
    })
  }

  // Check if the article is already saved or viewed
  const existingActivity = activity?.find((activity) => {
    if (activity?.type === ArticleActivityType.SaveArticle && tab === "saved") {
      return activity
    } else if (
      activity?.type === ArticleActivityType.ViewArticle &&
      tab === "viewed"
    ) {
      return activity
    }
  })

  const { data: loggedInQueryData } = useLoggedInQuery()
  const [toggleRecommendArticle] = useToggleRecommendArticleMutation({
    onCompleted: () =>
      toast({
        message: "Empfehlung geändert",
        type: "success",
      }),
    onError: () =>
      toast({
        message: "Fehler beim Ändern der Empfehlung",
      }),
    refetchQueries: [RecommendedArticlesDocument],
    update: (cache, { data }) => {
      if (!data?.toggleRecommendArticle) {
        return
      }
      cache.modify({
        id: cache.identify({
          __typename: "Article",
          id,
        }),
        fields: {
          recommended() {
            return data.toggleRecommendArticle.recommended
          },
        },
      })
    },
  })
  const [createArticleActivity] = useCreateArticleActivityMutation({
    onCompleted: () =>
      toast({
        message: "Artikel gespeichert",
        type: "success",
      }),
    onError: () =>
      toast({
        message: "Fehler beim Speichern des Artikels",
      }),
    update: (cache, { data }) => {
      if (!data?.createArticleActivity) {
        return
      }
      cache.modify({
        id: cache.identify({
          __typename: "Article",
          id,
        }),
        fields: {
          activity() {
            return [activity, data.createArticleActivity]
          },
        },
      })
    },
  })
  const [deleteArticleActivity] = useDeleteArticleActivityMutation({
    onCompleted: () =>
      toast({
        message: "Artikel nicht mehr gespeichert",
        type: "success",
      }),
    onError: () =>
      toast({
        message: "Fehler beim Un-Speichern des Artikels",
      }),
    update: (cache, { data }) => {
      if (!data?.deleteArticleActivity) {
        return
      }
      cache.modify({
        id: cache.identify({
          __typename: "Article",
          id,
        }),
        fields: {
          activity() {
            if (activity) {
              return [
                activity.filter(
                  (a) => a?.id !== data.deleteArticleActivity?.id
                ),
              ]
            } else {
              return null
            }
          },
        },
      })
    },
  })
  const handleSaveArticle = async () => {
    const existing = activity?.find(
      (article) => article?.type === ArticleActivityType.SaveArticle
    )
    if (existing) {
      deleteArticleActivity({
        variables: {
          id: existing.id,
        },
      })
    } else {
      createArticleActivity({
        variables: {
          data: {
            type: ArticleActivityType.SaveArticle,
            articleId: id,
          },
        },
      })
    }
  }

  return (
    <Flex gap="sm">
      {loggedInQueryData?.loggedIn.role === Role.Admin ? (
        <Star
          size={compact ? 16 : 20}
          className={styles.action}
          fill={
            recommended ? "gold" : colorScheme === "dark" ? "black" : "white"
          }
          color={recommended ? "gold" : undefined}
          onClick={() => {
            toggleRecommendArticle({ variables: { id } })
          }}
        />
      ) : null}
      <Bookmark
        size={compact ? 16 : 20}
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
        onClick={handleSaveArticle}
      />
      <Link
        size={compact ? 16 : 20}
        className={styles.action}
        onClick={handleCopyLink}
      />
      {tab === "viewed" && existingActivity ? (
        <Trash
          className={styles.action}
          color="var(--color-error)"
          size={compact ? 16 : 20}
          onClick={() => {
            deleteArticleActivity({
              variables: {
                id: existingActivity.id,
              },
            })
          }}
        />
      ) : null}
    </Flex>
  )
}
