import { createContext } from "react";

export interface ControllerActionsContext {
  call: (method: string, payload?: any) => Promise<void>;
  fresh: () => Promise<void>;
}

export default createContext<ControllerActionsContext | null>(null);
