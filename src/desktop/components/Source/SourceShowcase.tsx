import React, { useEffect, useState } from "react";

import { Flex, Spacing } from "@sampled-ui/base";
import { Vibrant } from "node-vibrant/browser";

import { SourceProfileFragment } from "../../../../generated/graphql";
import { useColorScheme } from "../../../shared/hooks/colorScheme";
import { invertLogo } from "../Article/invertLogo";

interface SourceShowcaseProps {
  source: SourceProfileFragment;
}

export const SourceShowcase: React.FC<SourceShowcaseProps> = ({ source }) => {
  const { colorScheme } = useColorScheme();
  const [backgroundColor, setBackgroundColor] = useState(
    colorScheme === "dark" ? "black" : "white"
  );

  useEffect(() => {
    const logo = source?.logo;
    if (logo) {
      Vibrant.from(logo)
        .getPalette()
        .then((palette) => {
          const hsl = palette.Vibrant?.hsl;
          if (hsl?.[1] === 0) {
            setBackgroundColor(colorScheme === "dark" ? "#333" : "gainsboro");
          } else if (palette.Vibrant?.hex) {
            setBackgroundColor(palette.Vibrant?.hex);
          }
        });
    }
  }, [colorScheme, source?.logo]);

  const invert =
    colorScheme === "dark" ? invertLogo(source?.key ?? "") : undefined;

  return (
    <Flex
      align="end"
      justify="center"
      style={{
        width: "100%",
        height: "10rem",
        background: `var(--color-gradient), ${backgroundColor}`,
        backgroundBlendMode: colorScheme === "dark" ? "darken" : "lighten",
        transition: "background-color 0.5s ease-in",
        transitionDelay: "0.2s",
      }}
    >
      <Spacing gap="lg" style={{ marginBottom: "-2rem" }}>
        <img
          src={source?.logo}
          style={{
            maxHeight: "3rem",
            borderRadius: "0.5rem",
            filter: invert ? `invert(1)` : undefined,
          }}
        />
      </Spacing>
    </Flex>
  );
};
