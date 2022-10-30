import { createContext, useReducer } from 'react'

import { set } from 'lodash'

export enum ControllerDataActions {
  SET = 'SET',
  REPLACE = 'REPLACE',
}

export interface ControllerDataAction {
  type: ControllerDataActions
  name: string
  value: any
}

export interface ControllerDataState {
  [key: string | number]: any
}

export const initial = {}

export function controllerDataReducer(state: ControllerDataState, action: ControllerDataAction) {
  const { type, name, value } = action
  switch (type) {
    case ControllerDataActions.SET:
      return set(
        {
          ...state,
        },
        name,
        value,
      )
    case ControllerDataActions.REPLACE:
      return { ...value }
    default:
      return state
  }
}

export default createContext<[ControllerDataState, any, any] | null>(null)

export function hasControllerData() {
  const reducer = useReducer(controllerDataReducer, initial)
  return reducer
}
