export declare enum ControllerDataActions {
    SET = "SET",
    REPLACE = "REPLACE"
}
export interface ControllerDataAction {
    type: ControllerDataActions;
    name: string;
    value: any;
}
export interface ControllerDataState {
    [key: string | number]: any;
}
export declare const initial: {};
export declare function controllerDataReducer(state: ControllerDataState, action: ControllerDataAction): any;
declare const _default: import("react").Context<[ControllerDataState, any, any] | null>;
export default _default;
export declare function hasControllerData(): [any, import("react").Dispatch<ControllerDataAction>];
