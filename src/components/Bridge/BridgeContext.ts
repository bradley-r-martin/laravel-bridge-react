import { createContext, MutableRefObject } from 'react'

import { ControllerReference } from '../Controller/Controller'

interface BridgeContext {
  call: (ref: MutableRefObject<ControllerReference>, method: string, payload?: any) => Promise<void>
  sync: (ref: MutableRefObject<ControllerReference>) => Promise<void>
  fresh: (ref: MutableRefObject<ControllerReference>) => Promise<void>
  mount: (ref: MutableRefObject<ControllerReference>) => Promise<void>
  unmount: (ref: MutableRefObject<ControllerReference>) => Promise<void>
  register: (ref: MutableRefObject<ControllerReference>) => Promise<void>
  deregister: (ref: MutableRefObject<ControllerReference>) => Promise<void>
}

export default createContext<BridgeContext | null>(null)
