import React, { useCallback, useEffect, useMemo, useState } from "react"

import { Input, Menu } from "@sampled-ui/base"
import { useInView } from "react-intersection-observer"
import { useLocation, useNavigate } from "react-router"

import { useSearchTermsLazyQuery } from "../../../../generated/graphql"

interface SearchBarProps {
  search?: (query: string) => Promise<void>
}

const SearchBar: React.FC<SearchBarProps> = ({ search }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const searchParam = new URLSearchParams(location.search).get("search")

  const [searchTerms, { data: searchTermsData, fetchMore: fetchMoreTerms }] =
    useSearchTermsLazyQuery()
  const [hasMoreTerms, setHasMoreTerms] = useState(true)

  useEffect(() => {
    if (searchParam) {
      if (search) {
        searchTerms({
          variables: {
            query: searchParam,
          },
        }).then((terms) => {
          if ((terms.data?.searchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(true)
          }
        })
      } else {
        searchTerms({
          variables: {
            query: searchParam,
          },
        }).then((terms) => {
          if ((terms.data?.searchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(true)
          }
        })
      }
    } else {
      searchTerms({})
    }
  }, [search, searchParam, searchTerms])

  const loadMoreTerms = useCallback(() => {
    if (hasMoreTerms) {
      fetchMoreTerms({
        variables: {
          query: searchParam ?? "",
          pagination: {
            offset: searchTermsData?.searchTerms?.length ?? 0,
            limit: 10,
          },
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if ((fetchMoreResult.searchTerms?.length ?? 0) < 10) {
            setHasMoreTerms(false)
          }
          if (
            prev.searchTerms &&
            fetchMoreResult.searchTerms &&
            (fetchMoreResult.searchTerms?.length ?? 0) > 0
          ) {
            return Object.assign({}, prev, {
              searchTerms: [
                ...prev.searchTerms,
                ...fetchMoreResult.searchTerms,
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
    searchTermsData?.searchTerms?.length,
  ])

  const { ref: lastMenuItemRef, inView: lastMenuItemRefInView } = useInView()
  useEffect(() => {
    if (lastMenuItemRefInView && hasMoreTerms) {
      loadMoreTerms()
    }
  }, [hasMoreTerms, lastMenuItemRefInView, loadMoreTerms])

  const navigateToSearchTerm = useCallback(
    (id: string) => {
      const newParam = new URLSearchParams()
      newParam.set("term", id)
      navigate(`${location.pathname}?${newParam.toString()}`)
    },
    [location.pathname, navigate]
  )
  const navigateToSearch = useCallback(
    (id: string) => {
      const newParam = new URLSearchParams()
      newParam.set("search", id)
      navigate(`${location.pathname}?${newParam.toString()}`)
    },
    [location.pathname, navigate]
  )

  const searchBar = useMemo(() => {
    return (
      <Menu
        items={
          searchTermsData?.searchTerms?.map((searchTerm, index) => ({
            title:
              searchTerm.term!.trim() +
              (searchTerm.source ? ` (${searchTerm.source.name})` : "") +
              (searchTerm.topic ? ` (${searchTerm.topic.name})` : ""),
            key: `${searchTerm.term}-${searchTerm.id}`.trim(),
            ref:
              index === (searchTermsData?.searchTerms?.length ?? 0) - 1
                ? lastMenuItemRef
                : undefined,
          })) ?? []
        }
        onSelect={(item) => {
          const term = searchTermsData?.searchTerms?.find(
            (term) => term.id === item.key.substring(item.key.indexOf("-") + 1)
          )
          if (term?.source?.id || term?.topic?.id) {
            navigateToSearchTerm(term.id)
          } else {
            navigateToSearch(term?.term ?? "")
          }
        }}
        alignment="bottom"
      >
        <Input
          placeholder="Suchen"
          style={{ width: "calc(100% - 1.5rem)", alignSelf: "center" }}
          value={searchParam ?? ""}
          onChange={(e) => {
            const query = e.target.value
            if (!query) {
              const newParam = new URLSearchParams(location.search)
              newParam.delete("search")
              navigate(`/explore?${newParam.toString()}`, { replace: true })
            } else {
              navigateToSearch(query)
            }
          }}
        />
      </Menu>
    )
  }, [
    lastMenuItemRef,
    location.search,
    navigate,
    navigateToSearch,
    navigateToSearchTerm,
    searchParam,
    searchTermsData?.searchTerms,
  ])

  return searchBar
}

export default SearchBar
