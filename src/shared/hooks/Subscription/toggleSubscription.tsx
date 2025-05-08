import { useCallback } from "react"

import { RefetchQueryDescriptor } from "@apollo/client"

import {
  CreateSubscriptionMutationVariables,
  Subscription,
  useCreateSubscriptionMutation,
  useDeleteSubscriptionMutation,
  UserSubscriptionFragment,
  UserSubscriptionFragmentDoc,
} from "../../../../generated/graphql"
import { useAuthRedirect } from "../../components/PrivatePage/hooks"

export const useToggleSubscription = ({
  subscription,
  createVariables,
  refetchQueries,
}: {
  subscription?: Pick<Subscription, "id"> | null
  createVariables?: CreateSubscriptionMutationVariables
  refetchQueries?: RefetchQueryDescriptor[]
}) => {
  const { redirect, loggedIn } = useAuthRedirect()

  const [createSubscription] = useCreateSubscriptionMutation({
    update: (cache, { data }) => {
      cache.modify({
        fields: {
          subscriptions(existingUserSubscriptions = []) {
            const newUserSubscriptionRef = cache.writeFragment({
              data: data?.createSubscription,
              fragment: UserSubscriptionFragmentDoc,
            })
            return [...existingUserSubscriptions, newUserSubscriptionRef]
          },
        },
      })
    },
    refetchQueries,
  })
  const [deleteSubscription] = useDeleteSubscriptionMutation({
    update: (cache, deleteMutationResult) => {
      cache.modify({
        fields: {
          subscriptions(existingUserSubscriptions = [], { readField }) {
            return existingUserSubscriptions.filter(
              (userSubscriptionRef: UserSubscriptionFragment) =>
                readField("id", userSubscriptionRef) !==
                readField(
                  "id",
                  deleteMutationResult.data?.deleteSubscription as Subscription
                )
            )
          },
        },
      })
    },
    refetchQueries,
  })

  const handleToggle = useCallback(() => {
    if (!loggedIn) {
      redirect()
      return
    }
    if (subscription) {
      deleteSubscription({ variables: { id: subscription.id } })
    } else {
      createSubscription({
        variables: createVariables,
      })
    }
  }, [
    createSubscription,
    createVariables,
    deleteSubscription,
    loggedIn,
    redirect,
    subscription,
  ])

  return { handleToggle }
}
