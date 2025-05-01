import React from "react";

import { ApolloProvider } from "@apollo/client";
import { Flex, Typography } from "@sampled-ui/base";

import { client } from "../apollo";
import SvgWordmarkLogo from "../icons/WordmarkLogo";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Flex
        direction="column"
        align="center"
        style={{
          width: "100%",
          height: "100vh",
          backgroundColor: "#333",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <SvgWordmarkLogo width="70%" height="80%" viewBox="0 0 586 160" />
        <Typography.Text>
          Bald auch auf mobilen Geräten verfügbar. Probiere solange die Desktop
          Version aus.
        </Typography.Text>
      </Flex>
      {/* <RouterProvider router={router} /> */}
    </ApolloProvider>
  );
};

export default App;
