import ControllerData, {
  ControllerDataAction,
  ControllerDataActions,
  ControllerDataState,
  hasControllerData,
} from './ControllerData'
import ControllerExceptions, {
  ControllerExceptionsAction,
  hasControllerExceptions,
} from './ControllerExceptions'
import ControllerStatus, { ControllerStatusAction, hasControllerStatus } from './ControllerStatus'
import React, { Dispatch, FunctionComponent, useEffect, useMemo, useRef, useState } from 'react'

import ControllerActionsContext from './ControllerActionsContext'
import ControllerContext from './ControllerContext'
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
  dispatchExceptions: Dispatch<ControllerExceptionsAction>
}

const Controller: FunctionComponent<ControllerProps> = (props) => {
  const { children, ...additionalProps } = props
  const uuid = useMemo(() => uuidv4(), [])
  const bridge = useBridge()

  const [mustSync, setMustSync] = useState(false)

  const [exceptions, dispatchExceptions] = hasControllerExceptions()
  const [data, dispatchData] = hasControllerData()
  const [statuses, dispatchStatus] = hasControllerStatus()

  const ref = useRef<ControllerReference>({
    dispatchStatus,
    dispatchData,
    dispatchExceptions,
    data,
    props,
    uuid,
  })
  ref.current.dispatchStatus = dispatchStatus
  ref.current.dispatchData = dispatchData
  ref.current.dispatchExceptions = dispatchExceptions
  ref.current.data = data
  ref.current.props = additionalProps
  ref.current.uuid = uuid

  function call(method: string, payload: any) {
    return new Promise<void>((resolve) => bridge.call(ref, method, payload).then(resolve))
  }
  function sync() {
    return new Promise<void>((resolve) => bridge.sync(ref).then(resolve))
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
  function setData(name: string, value: any, instantly = false) {
    dispatchData({ type: ControllerDataActions.SET, name, value })

    if (instantly) {
      return new Promise((resolve) => {
        // Not great, however as react state is async we need to wait for it to be applied before running the sync.
        // But we also need to return a promise that we are sending to the server.
        setTimeout(() => {
          sync().then(resolve)
        }, 1)
      })
    }
  }
  function getData(name: string, initial?: any) {
    return get(data, name, initial)
  }
  function getExceptions(name: string) {
    return get(exceptions, name)
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
    <ControllerContext.Provider value={{ call, fresh, mount, unmount, register, deregister, sync }}>
      <ControllerActionsContext.Provider value={{ call, fresh, sync }}>
        <ControllerStatus.Provider value={statuses}>
          <ControllerData.Provider value={[data, setData, getData]}>
            <ControllerExceptions.Provider value={[exceptions, getExceptions]}>
              {children}
            </ControllerExceptions.Provider>
          </ControllerData.Provider>
        </ControllerStatus.Provider>
      </ControllerActionsContext.Provider>
    </ControllerContext.Provider>
  )
}

export default Controller
