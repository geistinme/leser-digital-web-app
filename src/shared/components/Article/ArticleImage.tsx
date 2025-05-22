import React, { CSSProperties } from "react"

import classNames from "classnames"

import { Article } from "../../../../generated/graphql"
import PreloadImage from "../PreloadImage"

import styles from "./Article.module.scss"

interface ArticleImageProps {
  article: Pick<Article, "id" | "url" | "image">
  compact?: boolean
  onClick?: () => void
  height?: string
  width?: string
  style?: CSSProperties
}

export const ArticleImage: React.FC<ArticleImageProps> = ({
  article,
  compact,
  onClick,
  height,
  width,
  style,
}) => {
  const calculatedWidth = width ? width : "100%"
  const calculatedHeight = height ? height : "20rem"

  return (
    <PreloadImage
      onClick={onClick}
      src={article.image ?? undefined}
      width={calculatedWidth}
      height={calculatedHeight}
      className={classNames(styles.image, { [styles.compact]: compact })}
      style={style}
    />
  )
}
