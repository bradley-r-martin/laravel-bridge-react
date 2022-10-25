import { createContext } from "react";

export interface ControllerContext {
  call: (method: string, payload?: any) => Promise<void>;
  fresh: () => Promise<void>;
  mount: () => Promise<void>;
  unmount: () => Promise<void>;
  register: () => Promise<void>;
  deregister: () => Promise<void>;
}

export default createContext<ControllerContext | null>(null);
