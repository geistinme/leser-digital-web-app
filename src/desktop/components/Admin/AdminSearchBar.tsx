import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Input, Menu } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import { useAllSearchTermsLazyQuery } from "../../../../generated/graphql"

interface AdminSearchBarProps {
  search?: (query: string) => void
}

const AdminSearchBar: React.FC<AdminSearchBarProps> = ({ search }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")
  const tabParam = new URLSearchParams(location.search).get("tab")
  const active = tabParam === "active" || tabParam === null

  const [allSearchTerms, { data: searchTermsData, fetchMore: fetchMoreTerms }] =
    useAllSearchTermsLazyQuery()
  const [hasMoreTerms, setHasMoreTerms] = useState(true)

  useEffect(() => {
    if (searchParam) {
      if (search) {
        search?.(searchParam)
      } else {
        allSearchTerms({
          variables: {
            active,
            query: searchParam,
          },
        }).then((terms) => {
          if ((terms.data?.allSearchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(true)
          }
        })
      }
    }
  }, [search, searchParam, allSearchTerms, active])

  const loadMoreTerms = useCallback(() => {
    if (hasMoreTerms) {
      fetchMoreTerms({
        variables: {
          query: searchParam ?? "",
          pagination: {
            offset: searchTermsData?.allSearchTerms?.length ?? 0,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.allSearchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(false)
          }
          if (
            prev.allSearchTerms &&
            fetchMoreResult.allSearchTerms &&
            (fetchMoreResult.allSearchTerms?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              allSearchTerms: [
                ...prev.allSearchTerms,
                ...fetchMoreResult.allSearchTerms,
              ],
            })
          }
          return prev
        },
      })
    }
  }, [
    fetchMoreTerms,
    hasMoreTerms,
    searchParam,
    searchTermsData?.allSearchTerms?.length,
  ])

  const { ref: lastMenuItemRef, inView: lastMenuItemRefInView } = useInView()
  useEffect(() => {
    if (lastMenuItemRefInView && hasMoreTerms) {
      loadMoreTerms()
    }
  }, [hasMoreTerms, lastMenuItemRefInView, loadMoreTerms])

  const searchBar = useMemo(() => {
    return (
      <Menu
        items={
          searchTermsData?.allSearchTerms?.map((searchTerm, index) => ({
            title:
              searchTerm.term!.trim() +
              (searchTerm.source ? ` (${searchTerm.source.name})` : "") +
              (searchTerm.topic ? ` (${searchTerm.topic.name})` : ""),
            key: `${searchTerm.term}-${searchTerm.id}`.trim(),
            ref:
              index === (searchTermsData?.allSearchTerms?.length ?? 0) - 1
                ? lastMenuItemRef
                : undefined,
          })) ?? []
        }
        onSelect={(item) => {
          const newParam = new URLSearchParams(location.search)
          newParam.set("search", item.key.substring(0, item.key.indexOf("-")))
          navigate(`${location.pathname}?${newParam.toString()}`, {
            replace: true,
          })
        }}
        alignment="bottom"
      >
        <Input
          placeholder="Suchen"
          style={{ width: "calc(100% - 1.5rem)", alignSelf: "center" }}
          value={searchParam ?? ""}
          onChange={(e) => {
            const query = e.target.value
            const newParam = new URLSearchParams(location.search)
            newParam.set("search", query)
            navigate(`${location.pathname}?${newParam.toString()}`, {
              replace: true,
            })
          }}
        />
      </Menu>
    )
  }, [
    lastMenuItemRef,
    location.pathname,
    location.search,
    navigate,
    searchParam,
    searchTermsData?.allSearchTerms,
  ])

  return searchBar
}

export default AdminSearchBar
