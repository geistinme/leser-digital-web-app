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
  const calculatedWidth = width ? width : compact ? "10rem" : "100%"
  const calculatedHeight = height ? height : compact ? "10rem" : "20rem"

  return (
    <a
      href={article.url}
      target="_blank"
      onClick={onClick}
      style={{
        all: "unset",
        height: calculatedHeight,
        width: calculatedWidth,
      }}
    >
      <PreloadImage
        src={article.image ?? undefined}
        width={calculatedWidth}
        height={calculatedHeight}
        className={classNames(styles.image, { [styles.compact]: compact })}
        style={style}
      />
    </a>
  )
}
