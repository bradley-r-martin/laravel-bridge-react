export declare enum ControllerStatusActions {
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
    DEREGISTERED = "DEREGISTERED"
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
export declare const initial: {
    isRegistered: boolean;
    isRegistering: boolean;
    isDeregistering: boolean;
    isMounted: boolean;
    isMounting: boolean;
    isUnmounting: boolean;
    isDispatched: boolean;
    isQueued: boolean;
    isProcessing: boolean;
    isSyncing: boolean;
};
export declare function controllerStatusReducer(state: ControllerStatusState, action: ControllerStatusAction): ControllerStatusState;
declare const _default: import("react").Context<ControllerStatusState | null>;
export default _default;
export declare function hasControllerStatus(): [ControllerStatusState, import("react").Dispatch<ControllerStatusAction>];
