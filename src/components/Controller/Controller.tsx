import ControllerData, {
  ControllerDataAction,
  ControllerDataActions,
  ControllerDataState,
  hasControllerData,
} from './ControllerData'
import ControllerStatus, { ControllerStatusAction, hasControllerStatus } from './ControllerStatus'
import React, { Dispatch, FunctionComponent, useEffect, useMemo, useRef } from 'react'

import ControllerActionsContext from './ControllerActionsContext'
import ControllerContext from './ControllerContext'
import Debugger from '../Debugger/Debugger'
import { get } from 'lodash'
import useBridge from '../../hooks/useBridge'
import { v4 as uuidv4 } from 'uuid'

interface ControllerProps {
  controller: string
  children?: React.ReactNode
}

export interface ControllerReference {
  uuid: string
  props: any
  data: ControllerDataState
  dispatchData: Dispatch<ControllerDataAction>
  dispatchStatus: Dispatch<ControllerStatusAction>
}

const Controller: FunctionComponent<ControllerProps> = (props) => {
  const { children, ...additionalProps } = props
  const uuid = useMemo(() => uuidv4(), [])
  const bridge = useBridge()

  const [data, dispatchData] = hasControllerData()
  const [statuses, dispatchStatus] = hasControllerStatus()

  const ref = useRef<ControllerReference>({
    dispatchStatus,
    dispatchData,
    data,
    props,
    uuid,
  })
  ref.current.dispatchStatus = dispatchStatus
  ref.current.dispatchData = dispatchData
  ref.current.data = data
  ref.current.props = additionalProps
  ref.current.uuid = uuid

  function call(method: string, payload: any) {
    return new Promise<void>((resolve) => bridge.call(ref, method, payload).then(resolve))
  }
  function fresh() {
    return new Promise<void>((resolve) => bridge.fresh(ref).then(resolve))
  }
  function mount() {
    return new Promise<void>((resolve) => bridge.mount(ref).then(resolve))
  }
  function unmount() {
    return new Promise<void>((resolve) => bridge.unmount(ref).then(resolve))
  }
  function register() {
    return new Promise<void>((resolve) => bridge.register(ref).then(resolve))
  }
  function deregister() {
    return new Promise<void>((resolve) => bridge.deregister(ref).then(resolve))
  }
  function setData(name: string, value: any) {
    dispatchData({ type: ControllerDataActions.SET, name, value })
  }
  function getData(name: string, initial?: any) {
    return get(data, name, initial)
  }

  useEffect(() => {
    register()
    return () => {
      deregister()
    }
  }, [ref])

  useEffect(() => {
    if (statuses.isRegistered) {
      mount()
    }
    return () => {
      if (!statuses.isRegistered) {
        unmount()
      }
    }
  }, [statuses.isRegistered])

  return (
    <ControllerContext.Provider value={{ call, fresh, mount, unmount, register, deregister }}>
      <ControllerActionsContext.Provider value={{ call, fresh }}>
        <ControllerStatus.Provider value={statuses}>
          <ControllerData.Provider value={[data, setData, getData]}>
            {children}
          </ControllerData.Provider>
        </ControllerStatus.Provider>
      </ControllerActionsContext.Provider>
    </ControllerContext.Provider>
  )
}

export default Controller
