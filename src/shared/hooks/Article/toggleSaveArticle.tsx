import { useCallback } from "react"

import { useToast } from "@sampled-ui/base"

import {
    ArticleActivity,
    ArticleActivityType,
    useCreateArticleActivityMutation,
    useDeleteArticleActivityMutation,
} from "../../../../generated/graphql"

export const useToggleSaveArticle = ({
  activity,
  id,
}: {
  activity?: Pick<ArticleActivity, "id" | "type">[] | null
  id: string
}) => {
  const { toast } = useToast()
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
  const toggleSaveArticle = useCallback(async () => {
    const existing = activity?.find(
      (article) => article?.type === ArticleActivityType.SaveArticle
    )
    if (existing && existing.id) {
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
  }, [activity, createArticleActivity, deleteArticleActivity, id])

  return toggleSaveArticle
}
