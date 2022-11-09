import { createContext, useReducer } from 'react'

export enum ControllerExceptionsActions {
  SYNC = 'SYNC',
}

export interface ControllerExceptionsAction {
  type: ControllerExceptionsActions
  exceptions: any
}

export interface ControllerExceptionsState {
  [key: string | number]: any
}

export const initial = {}

export function ControllerExceptionsReducer(
  state: ControllerExceptionsState,
  action: ControllerExceptionsAction,
) {
  const { type, exceptions } = action
  switch (type) {
    case ControllerExceptionsActions.SYNC:
      return { ...exceptions }
    default:
      return state
  }
}

export default createContext<[ControllerExceptionsState, any] | null>(null)

export function hasControllerExceptions() {
  const reducer = useReducer(ControllerExceptionsReducer, initial)
  return reducer
}
