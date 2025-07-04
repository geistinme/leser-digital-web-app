import React from "react"

import { Flex, Tabs, Typography } from "@sampled-ui/base"
import { useLocation, useNavigate } from "react-router"

import AdminSearchBar from "../../components/Admin/AdminSearchBar"
import AdminSearchTerms from "../../components/Admin/AdminSearchTerms"

interface AdminPageProps {}

const AdminPage: React.FC<AdminPageProps> = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const tab = searchParams.get("tab") || "active"
  return (
    <Flex
      direction="column"
      align="stretch"
      gap="md"
      style={{ maxWidth: "40rem", margin: "auto", marginTop: "2rem" }}
    >
      <Typography.Heading level={4}>Search terms</Typography.Heading>
      <Tabs
        items={[
          { title: "Active", key: "active" },
          { title: "Inactive", key: "inactive" },
        ]}
        onSelect={(item) => {
          navigate(`/admin?tab=${item.key}`)
        }}
        selected={tab}
      />
      <AdminSearchBar />
      <AdminSearchTerms active={tab === "active"} />
    </Flex>
  )
}

export default AdminPage
