import React, { CSSProperties, useEffect, useRef } from "react";

import classNames from "classnames";

import { Article } from "../../../../generated/graphql";

import { Skeleton } from "@sampled-ui/base";
import styles from "./ArticleShowcase.module.scss";

interface ArticleImageProps {
  article: Pick<Article, "id" | "url" | "image">;
  compact?: boolean;
  onClick?: () => void;
  height?: string;
  width?: string;
  style?: CSSProperties;
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  article,
  compact,
  onClick,
  height,
  width,
  style,
}) => {
  const imageBackgroundRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  useEffect(() => {
    if (imageBackgroundRef.current && article.image) {
      const image = new Image();
      image.onload = function () {
        // Now it's safe to use the image as a background
        if (imageBackgroundRef.current?.style) {
          imageBackgroundRef.current.style.backgroundImage = `url('${article.image}')`;
          setImageLoaded(true);
        }
      };
      image.onerror = function () {
        console.error("Background image failed to load");
        setImageLoaded(true);
      };
      image.src = article.image;
    }
  }, [article.image]);

  const calculatedWidth = width ? width : compact ? "10rem" : "100%";
  const calculatedHeight = height ? height : compact ? "10rem" : "20rem";

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
      <div
        ref={imageBackgroundRef}
        style={{
          height: calculatedHeight,
          width: calculatedWidth,
          display: imageLoaded ? "block" : "none",
          ...(style ?? {}),
        }}
        className={classNames(styles.image, { [styles.compact]: compact })}
      />
      {imageLoaded ? null : (
        <Skeleton
          width={calculatedWidth}
          height={calculatedHeight}
          style={{ borderRadius: "initial" }}
        />
      )}
    </a>
  );
};

export default ArticleImage;
