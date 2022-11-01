export interface ControllerContext {
    call: (method: string, payload?: any) => Promise<void>;
    sync: () => Promise<void>;
    fresh: () => Promise<void>;
    mount: () => Promise<void>;
    unmount: () => Promise<void>;
    register: () => Promise<void>;
    deregister: () => Promise<void>;
}
declare const _default: import("react").Context<ControllerContext | null>;
export default _default;
