import React from "react";

import { ApolloProvider } from "@apollo/client";
import { Flex, Spacing, Typography } from "@sampled-ui/base";

import { client } from "../apollo";
import SvgWordmarkLogo from "../icons/WordmarkLogo";
import { useColorScheme } from "../shared/hooks/colorScheme";

const App: React.FC = () => {
  const { colorScheme } = useColorScheme();
  const backgroundColor = colorScheme === "dark" ? "#333" : "#fff";
  const color = colorScheme === "dark" ? "#fff" : "#000";
  return (
    <ApolloProvider client={client}>
      <Flex
        direction="column"
        align="center"
        style={{
          width: "100%",
          height: "100vh",
          textAlign: "center",
          color,
          backgroundColor,
        }}
      >
        <SvgWordmarkLogo width="70%" height="80%" viewBox="0 0 586 160" />
        <Spacing gap="xl">
          <Typography.Text>
            Bald auch auf mobilen Geräten verfügbar. Probiere solange die
            Desktop Version aus.
          </Typography.Text>
        </Spacing>
      </Flex>
      {/* <RouterProvider router={router} /> */}
    </ApolloProvider>
  );
};

export default App;
