export declare enum ControllerExceptionsActions {
    SYNC = "SYNC"
}
export interface ControllerExceptionsAction {
    type: ControllerExceptionsActions;
    exceptions: any;
}
export interface ControllerExceptionsState {
    [key: string | number]: any;
}
export declare const initial: {};
export declare function ControllerExceptionsReducer(state: ControllerExceptionsState, action: ControllerExceptionsAction): any;
declare const _default: import("react").Context<[ControllerExceptionsState, any] | null>;
export default _default;
export declare function hasControllerExceptions(): [any, import("react").Dispatch<ControllerExceptionsAction>];
