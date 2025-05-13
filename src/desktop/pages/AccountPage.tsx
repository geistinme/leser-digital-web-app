import React from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"

import { useLoggedInQuery } from "../../../generated/graphql"

export const AccountPage: React.FC = () => {
  const { data: loggedInQueryData } = useLoggedInQuery()
  return (
    <Spacing gap="xl">
      <title>Account</title>
      <Flex
        direction="column"
        align="start"
        gap="sm"
        style={{ width: "100%", maxWidth: "40rem", margin: "auto" }}
      >
        <Typography.Heading level={3}>
          {loggedInQueryData?.loggedIn.name as string}
        </Typography.Heading>
        <Typography.Text disabled>
          {loggedInQueryData?.loggedIn.email}
        </Typography.Text>
      </Flex>
    </Spacing>
  )
}
