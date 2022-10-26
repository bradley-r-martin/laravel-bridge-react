export interface ControllerActionsContext {
    call: (method: string, payload?: any) => Promise<void>;
    fresh: () => Promise<void>;
}
declare const _default: import("react").Context<ControllerActionsContext | null>;
export default _default;
