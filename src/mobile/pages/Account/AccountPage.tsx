import React from "react"

import { Button, Flex, Spacing, Statistic, Typography } from "@sampled-ui/base"
import { useNavigate } from "react-router"

import {
  useLogoutMutation,
  useMobileProfileQuery,
} from "../../../../generated/graphql"

export const AccountPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: mobileProfileQueryData } = useMobileProfileQuery()
  const [logout] = useLogoutMutation({
    refetchQueries: ["loggedIn"],
    onCompleted: () => {
      navigate("/")
      window.location.reload()
    },
  })

  return (
    <Spacing gap="xl" style={{ width: "100%" }}>
      <title>{mobileProfileQueryData?.loggedIn.name}</title>
      <Flex
        direction="column"
        align="start"
        gap="md"
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
          <Typography.Text disabled>
            {mobileProfileQueryData?.loggedIn.email}
          </Typography.Text>
        </Flex>
        <Flex gap="md">
          <Statistic
            value={mobileProfileQueryData?.subscriptions?.length ?? 0}
            label="Folge ich"
          />
          <Statistic
            value={mobileProfileQueryData?.savedArticles?.length ?? 0}
            label="Gespeicherte Artikel"
          />
        </Flex>
        <Button
          variant="danger"
          onClick={() => {
            logout()
          }}
        >
          Logout
        </Button>
      </Flex>
    </Spacing>
  )
}
