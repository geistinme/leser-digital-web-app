import React from "react"

import { Flex, Spacing, Typography } from "@sampled-ui/base"

import { useDesktopProfileQuery } from "../../../../generated/graphql"
import { UserActivity } from "../../../shared/components"

export const AccountPage: React.FC = () => {
  const { data: desktopProfileQueryData } = useDesktopProfileQuery()

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
            {desktopProfileQueryData?.loggedIn.name as string}
          </Typography.Heading>
          <Typography.Text variant="secondary">
            {desktopProfileQueryData?.loggedIn.email}
          </Typography.Text>
        </Flex>
      </Flex>
      <UserActivity profile={desktopProfileQueryData} />
    </Spacing>
  )
}
