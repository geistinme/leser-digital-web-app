import React, { CSSProperties, useEffect, useRef } from "react";

import { Skeleton } from "@sampled-ui/base";

interface PreloadImageProps extends React.HTMLProps<HTMLDivElement> {
  src?: string;
  height: string;
  width: string;
  backgroundPosition?: CSSProperties["backgroundPosition"];
  backgroundSize?: CSSProperties["backgroundSize"];
}

const PreloadImage: React.FC<PreloadImageProps> = ({
  src,
  height,
  width,
  backgroundPosition,
  backgroundSize,
  className,
  style,
  ...rest
}) => {
  const imageBackgroundRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = React.useState(false);
  useEffect(() => {
    if (imageBackgroundRef.current && src) {
      const image = new Image();
      image.onload = function () {
        // Now it's safe to use the image as a background
        if (imageBackgroundRef.current?.style) {
          imageBackgroundRef.current.style.backgroundImage = `url('${src}')`;
          setImageLoaded(true);
        }
      };
      image.onerror = function () {
        console.error("Background image failed to load");
        setImageLoaded(true);
      };
      image.src = src;
    }
  }, [src]);

  const imageElement = (
    <div
      key="prefetch-image"
      ref={imageBackgroundRef}
      style={{
        height,
        width,
        display: imageLoaded ? "block" : "none",
        backgroundPosition: backgroundPosition ?? "center",
        backgroundSize: backgroundSize ?? "cover",
        ...(style ?? {}),
      }}
      {...rest}
      className={className}
    />
  );

  return imageLoaded
    ? imageElement
    : [
        imageElement,
        <Skeleton
          key="skeleton"
          width={width}
          height={height}
          style={{ borderRadius: "initial" }}
        />,
      ];
};

export default PreloadImage;
