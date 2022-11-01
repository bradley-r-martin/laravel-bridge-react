import { BridgeQueueActions, hasBridgeQueue } from './BridgeQueue'
import { BridgeRegistrationActions, hasBridgeRegistration } from './BridgeRegistration'
import React, { FunctionComponent, MutableRefObject, useState } from 'react'

import BridgeContext from './BridgeContext'
import { ControllerReference } from '../Controller/Controller'
import { ControllerStatusActions } from '../Controller/ControllerStatus'
import { syntaxHighlight } from '../Syntax/Syntax'

interface BridgeProps {
  children: React.ReactNode
  onRedirect?: (location: string) => void
}

const Bridge: FunctionComponent<BridgeProps> = (props) => {
  const { children } = props
  const [htmlResponse, setHtmlResponse] = useState<string>()
  const [refs, dispatchRegistration] = hasBridgeRegistration()

  function onRedirect(location: string) {
    if (props.onRedirect) {
      props.onRedirect(location)
    }
  }

  const [, dispatchQueue] = hasBridgeQueue(refs, setHtmlResponse, onRedirect)

  function call(ref: MutableRefObject<ControllerReference>, method: string, payload: any) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchQueue({
        type: BridgeQueueActions.QUEUE,
        payload: {
          resolve,
          ref,
          action: {
            uuid: ref.current.uuid,
            type: 'CALL',
            method,
            payload,
            state: ref.current.data,
            props: ref.current.props,
          },
        },
      })
    })
  }
  function sync(ref: MutableRefObject<ControllerReference>) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchQueue({
        type: BridgeQueueActions.QUEUE,
        payload: {
          resolve,
          ref,
          action: {
            uuid: ref.current.uuid,
            type: 'SYNC',
            state: ref.current.data,
            props: ref.current.props,
          },
        },
      })
    })
  }
  function fresh(ref: MutableRefObject<ControllerReference>) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchQueue({
        type: BridgeQueueActions.QUEUE,
        payload: {
          resolve,
          ref,
          action: {
            uuid: ref.current.uuid,
            type: 'FRESH',
            state: ref.current.data,
            props: ref.current.props,
          },
        },
      })
    })
  }
  function mount(ref: MutableRefObject<ControllerReference>) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchStatus({ type: ControllerStatusActions.MOUNTING })
      dispatchQueue({
        type: BridgeQueueActions.QUEUE,
        payload: {
          resolve: () => {
            dispatchStatus({ type: ControllerStatusActions.MOUNTED })
            resolve()
          },
          ref,
          action: {
            uuid: ref.current.uuid,
            type: 'MOUNT',
            state: ref.current.data,
            props: ref.current.props,
          },
        },
      })
    })
  }
  function unmount(ref: MutableRefObject<ControllerReference>) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchStatus({ type: ControllerStatusActions.UNMOUNTING })
      // happens immediately, no queuing
      dispatchStatus({ type: ControllerStatusActions.RELEASED })
      dispatchStatus({ type: ControllerStatusActions.UNMOUNTED })
      resolve()
    })
  }
  function register(ref: MutableRefObject<ControllerReference>) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchStatus({ type: ControllerStatusActions.REGISTERING })
      dispatchRegistration({ type: BridgeRegistrationActions.REGISTERED, ref })
      // happens immediately, no queuing
      dispatchStatus({ type: ControllerStatusActions.RELEASED })
      dispatchStatus({ type: ControllerStatusActions.REGISTERED })
      resolve()
    })
  }
  function deregister(ref: MutableRefObject<ControllerReference>) {
    const { dispatchStatus } = ref.current
    return new Promise<void>((resolve) => {
      dispatchStatus({ type: ControllerStatusActions.DISPATCHED })
      dispatchStatus({ type: ControllerStatusActions.DEREGISTERING })
      dispatchRegistration({
        type: BridgeRegistrationActions.DEREGISTERED,
        ref,
      })
      // happens immediately, no queuing
      dispatchStatus({ type: ControllerStatusActions.RELEASED })
      dispatchStatus({ type: ControllerStatusActions.DEREGISTERED })
      resolve()
    })
  }

  function renderHtmlResponse(frame: HTMLIFrameElement): void {
    if (!frame) {
      return
    }
    const doc = frame.contentDocument
    doc?.open()
    if (typeof htmlResponse === 'string') {
      doc?.write(`${htmlResponse}`)
    } else {
      doc?.write(syntaxHighlight(htmlResponse))
    }

    doc?.close()
  }
  const isDark = !`${htmlResponse}`.includes('window.ignite')
  return (
    <BridgeContext.Provider value={{ call, fresh, mount, unmount, register, deregister, sync }}>
      {htmlResponse ? (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-75' style={{ zIndex: 9999 }}>
            <div
              className={`shadow-2xl rounded-lg rounded-b-none absolute inset-20 bottom-0  ${
                isDark ? 'bg-[#18171B]' : ' bg-gray-200'
              } overflow-hidden flex flex-col`}
            >
              <div
                className={`${
                  isDark
                    ? 'bg-[#18171B] text-slate-500 border-slate-800'
                    : ' bg-white border-slate-300'
                } border-b  px-8 pr-4 p-3 flex items-center`}
              >
                <div className=' w-40 flex items-center'>
                  <span className='font-light'>Laravel</span>
                  <span className='font-bold'>Bridge</span>
                </div>
                <span className='pl-1 text-xs text-slate-500 flex-1 justify-center flex'>
                  Debugger
                </span>
                <div className='w-40 justify-end items-center flex'>
                  <button
                    onClick={(): void => setHtmlResponse(undefined)}
                    className={`
                  ${
                    isDark
                      ? 'bg-slate-800 text-gray-500 hover:bg-slate-700 active:bg-slate-900 focus-visible:outline-gray-400'
                      : 'bg-white text-gray-500 hover:bg-gray-50 active:bg-gray-200 focus-visible:outline-gray-400'
                  }
                  
                  relative outline-none overflow-hidden flex items-center justify-center  space-x-3 font-semibold text-xs no-underline transition ease-in-out duration-200 select-none cursor-pointer active:transform active:scale-95 focus-visible:outline-1 focus-visible:outline-dashed shadow rounded-full p-1.5 border-0`}
                  >
                    <span className='inline-flex flex-col'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                        aria-hidden='true'
                        className='h-4 w-4'
                      >
                        <path
                          fillRule='evenodd'
                          d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                          clipRule='evenodd'
                        ></path>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
              <iframe className='flex-1 w-full' ref={renderHtmlResponse}></iframe>
            </div>
          </div>
        </>
      ) : null}
      {children}
    </BridgeContext.Provider>
  )
}

export default Bridge
