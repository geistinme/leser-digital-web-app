import React from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"

import { useMobileProfileQuery } from "../../../generated/graphql"

export const AccountPage: React.FC = () => {
  const { data: mobileProfileQueryData } = useMobileProfileQuery()

  return (
    <Spacing
      gap="xl"
      style={{ width: "100%", maxWidth: "40rem", margin: "auto" }}
    >
      <title>Account</title>
      <Flex
        direction="column"
        align="start"
        gap="lg"
        style={{ width: "100%", marginBottom: "2rem" }}
      >
        <Flex
          direction="column"
          align="start"
          gap="sm"
          style={{ width: "100%" }}
        >
          <Typography.Heading level={3}>
            {mobileProfileQueryData?.loggedIn.name as string}
          </Typography.Heading>
          <Typography.Text variant="secondary">
            {mobileProfileQueryData?.loggedIn.email}
          </Typography.Text>
        </Flex>
      </Flex>
    </Spacing>
  )
}
