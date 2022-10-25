import { createContext, useReducer } from "react";

// An enum with all the types of actions to use in our reducer
export enum ControllerStatusActions {
  DISPATCHED = "DISPATCHED",
  QUEUED = "QUEUED",
  PROCESSING = "PROCESSING",
  RELEASED = "RELEASED",

  MOUNTING = "MOUNTING",
  MOUNTED = "MOUNTED",

  SYNCING = "SYNCING",
  SYNCED = "SYNCED",

  UNMOUNTING = "UNMOUNTING",
  UNMOUNTED = "UNMOUNTED",

  REGISTERING = "REGISTERING",
  REGISTERED = "REGISTERED",

  DEREGISTERING = "DEREGISTERING",
  DEREGISTERED = "DEREGISTERED",
}

export interface ControllerStatusAction {
  type: ControllerStatusActions;
}

export interface ControllerStatusState {
  isDispatched: boolean;
  isQueued: boolean;
  isProcessing: boolean;

  isRegistered: boolean;
  isRegistering: boolean;
  isDeregistering: boolean;

  isMounting: boolean;
  isMounted: boolean;
  isUnmounting: boolean;
  isSyncing: boolean;
}

export const initial = {
  isRegistered: false,
  isRegistering: false,
  isDeregistering: false,

  isMounted: false,
  isMounting: false,
  isUnmounting: false,

  isDispatched: false,
  isQueued: false,
  isProcessing: false,

  isSyncing: false,
};

// Our reducer function that uses a switch statement to handle our actions
export function controllerStatusReducer(
  state: ControllerStatusState,
  action: ControllerStatusAction
) {
  const { type } = action;
  switch (type) {
    case ControllerStatusActions.DISPATCHED:
      return {
        ...state,
        isDispatched: true,
      };
    case ControllerStatusActions.QUEUED:
      return {
        ...state,
        isQueued: true,
      };
    case ControllerStatusActions.PROCESSING:
      return {
        ...state,
        isQueued: false,
        isProcessing: true,
      };
    case ControllerStatusActions.RELEASED:
      return {
        ...state,
        isProcessing: false,
        isDispatched: false,
      };
    case ControllerStatusActions.MOUNTING:
      return {
        ...state,
        isMounting: true,
      };
    case ControllerStatusActions.MOUNTED:
      return {
        ...state,
        isMounting: false,
        isMounted: true,
      };
    case ControllerStatusActions.UNMOUNTING:
      return {
        ...state,
        isUnmounting: true,
      };
    case ControllerStatusActions.UNMOUNTED:
      return {
        ...state,
        isUnmounting: false,
        isMounted: false,
      };
    case ControllerStatusActions.REGISTERING:
      return {
        ...state,
        isRegistering: true,
      };
    case ControllerStatusActions.REGISTERED:
      return {
        ...state,
        isRegistering: false,
        isRegistered: true,
      };
    case ControllerStatusActions.DEREGISTERING:
      return {
        ...state,
        isDeregistering: true,
      };
    case ControllerStatusActions.DEREGISTERED:
      return {
        ...state,
        isDeregistering: false,
        isRegistered: false,
      };
    case ControllerStatusActions.SYNCING:
      return {
        ...state,
        isSyncing: true,
      };
    case ControllerStatusActions.SYNCED:
      return {
        ...state,
        isSyncing: false,
      };
    default:
      return state;
  }
}

export default createContext<ControllerStatusState | null>(null);

export function hasControllerStatus() {
  const reducer = useReducer(controllerStatusReducer, initial);
  return reducer;
}
