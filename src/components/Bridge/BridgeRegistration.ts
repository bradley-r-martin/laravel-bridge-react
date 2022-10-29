import { MutableRefObject, useReducer } from 'react'

import { ControllerReference } from '../Controller/Controller'

export enum BridgeRegistrationActions {
  REGISTERING = 'REGISTERING',
  REGISTERED = 'REGISTERED',

  DEREGISTERING = 'DEREGISTERING',
  DEREGISTERED = 'DEREGISTERED',
}

export interface BridgeRegistrationAction {
  type: BridgeRegistrationActions
  ref: MutableRefObject<ControllerReference>
}

export type BridgeRegistrationState = MutableRefObject<ControllerReference>[]

export const initial = []

// Our reducer function that uses a switch statement to handle our actions
export function bridgeRegistrationReducer(
  state: BridgeRegistrationState,
  action: BridgeRegistrationAction,
) {
  const { type } = action
  switch (type) {
    case BridgeRegistrationActions.REGISTERING:
      return state
    case BridgeRegistrationActions.REGISTERED:
      return [...state.filter((ref) => ref !== action.ref), action.ref]
    case BridgeRegistrationActions.DEREGISTERING:
      return state
    case BridgeRegistrationActions.DEREGISTERED:
      return [...state.filter((ref) => ref !== action.ref)]
    default:
      return state
  }
}

export function hasBridgeRegistration() {
  const reducer = useReducer(bridgeRegistrationReducer, initial)
  return reducer
}
