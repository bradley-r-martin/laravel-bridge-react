import { Dispatch, MutableRefObject, SetStateAction, useEffect, useReducer } from 'react'

import axios from 'axios'
import { ControllerReference } from '../Controller/Controller'
import { ControllerDataActions } from '../Controller/ControllerData'
import { ControllerExceptionsActions } from '../Controller/ControllerExceptions'
import { ControllerStatusActions } from '../Controller/ControllerStatus'
import { BridgeRegistrationState } from './BridgeRegistration'

// An enum with all the types of actions to use in our reducer
export enum BridgeQueueActions {
  QUEUE = 'QUEUE',
  DISPATCH = 'DISPATCH',
  RELEASED = 'RELEASED',
}

export type Action = {
  type: 'MOUNT' | 'SYNC' | 'FRESH' | 'CALL'
  state: any
  props: any
  uuid: string
  method?: string
  payload?: any
}

export interface BridgeQueueAction {
  type: BridgeQueueActions
  payload: BridgeQueueState
}

export type BridgeQueueState = {
  isDispatched?: boolean
  resolve: (response: any) => void
  ref: MutableRefObject<ControllerReference>
  action: Action
}

export const initial = []

// Our reducer function that uses a switch statement to handle our actions
export function bridgeQueueReducer(state: BridgeQueueState[], action: BridgeQueueAction) {
  const { type } = action
  switch (type) {
    case BridgeQueueActions.QUEUE:
      return [...state, { ...action.payload, isDispatched: false }]
    case BridgeQueueActions.DISPATCH:
      return [
        ...state.filter(({ ref }) => ref !== action.payload.ref),
        { ...action.payload, isDispatched: true },
      ]
    case BridgeQueueActions.RELEASED:
      return [...state.filter(({ ref }) => ref !== action.payload.ref)]
    default:
      return state
  }
}
export function hasBridgeQueue(
  refs: BridgeRegistrationState,
  setHtmlResponse: Dispatch<SetStateAction<string | undefined>>,
  onRedirect: (location: string) => void,
) {
  const reducer = useReducer(bridgeQueueReducer, initial)
  const [queued, dispatchQueue] = reducer
  const dispatchable = queued.filter(({ isDispatched }) => !isDispatched)
  const syncable = refs.filter((ref) => !dispatchable.find((dispatched) => dispatched.ref === ref))
  useEffect(() => {
    if (dispatchable.length > 0) {
      // Add all other controllers to the request as a SYNC request
      const jobs: BridgeQueueState[] = syncable.map((ref) => {
        const { dispatchStatus } = ref.current
        dispatchStatus({ type: ControllerStatusActions.SYNCING })
        return {
          ref,
          resolve: () => {
            dispatchStatus({ type: ControllerStatusActions.SYNCED })
          },
          action: {
            uuid: ref.current.uuid,
            type: 'SYNC',
            state: ref.current.data,
            props: ref.current.props,
          },
        }
      })
      jobs.push(...dispatchable)

      dispatchable.map((queue) => {
        dispatchQueue({ type: BridgeQueueActions.DISPATCH, payload: queue })
      })

      const payload = jobs.reduce((a, j) => [...a, j.action] as any, [])

      // Dispatched
      jobs.map(({ ref: { current } }) =>
        current.dispatchStatus({ type: ControllerStatusActions.DISPATCHED }),
      )

      console.log('Jobs on this round', jobs)
      console.log('sending payload to server', payload)
      // do network request
      const debug = true
      axios({
        method: 'post',
        url: '/bridge',
        data: debug ? payload : btoa(JSON.stringify(payload)),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/html, application/xhtml+xml',
          'x-debug': debug,
        },
      })
        .then((response) => {
          jobs.map((queue) => {
            const request = response.data.payload.find(
              ({ uuid }: any) => uuid === queue.ref.current.uuid,
            )

            queue.ref.current.dispatchExceptions({
              type: ControllerExceptionsActions.SYNC,
              exceptions: request?.exceptions,
            })

            queue.ref.current.dispatchData({
              type: ControllerDataActions.REPLACE,
              name: '',
              value: request.state,
            })
            queue.resolve(request?.response)
          })
          if (response?.data?.redirect) {
            // redirect
            onRedirect(new URL(response.data.redirect).pathname)
          }
        })
        .catch((error) => {
          const { response } = error

          if (response?.data?.redirect) {
            // redirect
            onRedirect(new URL(response.data.redirect).pathname)
          } else if (response?.status === 404) {
            // bridge not found
          } else if (response?.status === 500) {
            // server error
            setHtmlResponse(response.data)
          } else if (response?.status === 301) {
            // unauthorised
          } else if (response?.status === 419) {
            // csrf token expired.
            window.location.reload()
          } else if (response?.status === 999) {
            // redirect - replace with react router.
            window.location.assign(new URL(response.data.redirect).pathname)
          } else if (response?.status === 422) {
            // validation
          } else {
            setHtmlResponse(error)
            console.log(error)
            throw new Error(error)
          }

          jobs.map((queue) => {
            queue.resolve(null)
          })
        })
        .finally(() => {
          jobs.map((queue) => {
            const { ref } = queue
            const { current } = ref
            current.dispatchStatus({ type: ControllerStatusActions.RELEASED })
            dispatchQueue({
              type: BridgeQueueActions.RELEASED,
              payload: queue,
            })
          })
        })
    }
  }, [queued])

  return reducer
}
