import React from "react";

import { Flex, useToast } from "@sampled-ui/base";
import { Bookmark, Link } from "lucide-react";

import {
  ArticleActivityType,
  ArticleFeedFragment,
  useCreateArticleActivityMutation,
  useDeleteArticleActivityMutation,
} from "../../../../generated/graphql";
import { useColorScheme } from "../../../shared/hooks/colorScheme";

import styles from "./Article.module.scss";

interface ArticleMenuProps {
  activity?: ArticleFeedFragment["activity"] | null;
  id: number;
  url: string;
}

const ArticleMenu: React.FC<ArticleMenuProps> = ({ activity, id, url }) => {
  const { colorScheme } = useColorScheme();
  const { toast } = useToast();
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    toast({
      message: "Link wurde kopiert",
    });
  };

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
        return;
      }
      cache.modify({
        id: cache.identify({
          __typename: "Article",
          id,
        }),
        fields: {
          activity() {
            return [activity, data.createArticleActivity];
          },
        },
      });
    },
  });
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
        return;
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
              ];
            } else {
              return null;
            }
          },
        },
      });
    },
  });
  const handleSaveArticle = async () => {
    const existing = activity?.find(
      (article) => article?.type === ArticleActivityType.SaveArticle
    );
    if (existing) {
      deleteArticleActivity({
        variables: {
          id: existing.id,
        },
      });
    } else {
      createArticleActivity({
        variables: {
          data: {
            type: ArticleActivityType.SaveArticle,
            articleId: id,
          },
        },
      });
    }
  };

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
        onClick={handleSaveArticle}
      />
      <Link size={20} className={styles.action} onClick={handleCopyLink} />
    </Flex>
  );
};

export default ArticleMenu;
