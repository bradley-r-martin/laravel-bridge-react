import React, { FunctionComponent, useState } from 'react'

import LoadingIndicator from '../../../src/examples/LoadingIndicator'
import Syntax from '../Syntax/Syntax'
import useController from '../../hooks/useController'
import useData from '../../hooks/useData'
import useStatus from '../../hooks/useStatus'

const Button = ({ onClick, active, children }: any) => {
  const [loading, setLoading] = useState(false)
  return (
    <button
      disabled={loading}
      className={`${
        active
          ? 'bg-slate-100 text-slate-400 pointer-events-none'
          : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
      } px-2 p-1 flex items-center justify-center space-x-2 relative text-xs`}
      onClick={() => {
        setLoading(true)
        onClick().then(() => setLoading(false))
      }}
    >
      <LoadingIndicator show={loading} />
      <span>{children}</span>
    </button>
  )
}

const CallButton = () => {
  const { call } = useController()
  return (
    <Button
      onClick={() =>
        new Promise((resolve) => {
          call('test', { some: 'data' }).then((response) => {
            console.log('CALL response', response)
            resolve(0)
          })
        })
      }
    >
      Call
    </Button>
  )
}
const MountButton = () => {
  const { mount } = useController()
  const { isMounted, isMounting } = useStatus()
  return (
    <Button ping={isMounting} active={isMounted} onClick={mount}>
      Mount
    </Button>
  )
}
const UnmountButton = () => {
  const { unmount } = useController()
  const { isMounted, isUnmounting } = useStatus()
  return (
    <Button ping={isUnmounting} active={!isMounted} onClick={unmount}>
      Unmount
    </Button>
  )
}
const RegisterButton = () => {
  const { register } = useController()
  const { isRegistered, isRegistering } = useStatus()
  return (
    <Button ping={isRegistering} active={isRegistered} onClick={register}>
      Register
    </Button>
  )
}
const DeregisterButton = () => {
  const { deregister } = useController()
  const { isRegistered, isDeregistering } = useStatus()
  return (
    <Button ping={isDeregistering} active={!isRegistered} onClick={deregister}>
      Deregister
    </Button>
  )
}
const FreshButton = () => {
  const { fresh } = useController()
  return <Button onClick={fresh}>Fresh</Button>
}

const Statuses = () => {
  const { isDispatched, isMounting, isRegistering, isQueued, isProcessing, isSyncing } = useStatus()
  return (
    <div className='flex flex-col space-y-1'>
      <div className='text-xs text-slate-500'>Events</div>
      <div className='grid grid-cols-2 gap-1'>
        <div
          className={`${
            isRegistering
              ? 'animate-pulse bg-purple-400 text-purple-700'
              : 'bg-slate-100 text-slate-300'
          } text-xs px-2 p-1 relative z-20`}
        >
          R
        </div>
        <div
          className={`${
            isMounting ? 'animate-pulse bg-amber-400 text-amber-700' : 'bg-slate-100 text-slate-300'
          } text-xs px-2 p-1 relative z-20`}
        >
          M
        </div>
        <div
          className={`${
            isSyncing ? 'animate-pulse bg-pink-400 text-pink-700' : 'bg-slate-100 text-slate-300'
          } text-xs px-2 p-1 relative z-20`}
        >
          S
        </div>
        <div
          className={`${
            isDispatched ? 'animate-pulse bg-sky-400 text-sky-700' : 'bg-slate-100 text-slate-300'
          } text-xs px-2 p-1 relative z-20`}
        >
          D
        </div>
        <div
          className={`${
            isQueued ? 'animate-pulse bg-rose-400 text-rose-700' : 'bg-slate-100 text-slate-300'
          } text-xs px-2 p-1 relative z-20`}
        >
          Q
        </div>
        <div
          className={`${
            isProcessing
              ? 'animate-pulse bg-emerald-400 text-emerald-700'
              : 'bg-slate-100 text-slate-300'
          } text-xs px-2 p-1 relative z-20`}
        >
          P
        </div>
      </div>
    </div>
  )
}

const Debugger: FunctionComponent = () => {
  const [data, updateData, getData] = useData()

  const [stateKey, setStateKey] = useState('text.var')

  return (
    <div className='py-4'>
      <div className='p-2 border border-slate-300 flex relative'>
        <div className='absolute top-0 transform -translate-y-1/2 text-xs bg-white p-0.5 px-3 rounded-full border border-slate-300'>
          Controller debugger
        </div>
        <div className='flex space-x-4 mt-2 flex-1'>
          <Statuses />
          <div className='flex flex-col space-y-1 w-96'>
            <div className='text-xs text-slate-500'>Actions</div>
            <div className='gap-1 grid grid-cols-3'>
              <CallButton />
              <MountButton />
              <UnmountButton />
              <RegisterButton />
              <DeregisterButton />
              <FreshButton />
            </div>
            <div className='text-xs flex items-center space-x-2'>
              <div className='text-slate-500'>Update var:</div>
              <input
                type='text'
                value={stateKey}
                onChange={(e) => setStateKey(e.target.value)}
                className='bg-slate-100 border border-slate-200 p-1'
              />
              <input
                type='text'
                value={`${getData(stateKey, '')}`}
                // ^ Convert all to text
                onChange={(e) => {
                  let input: any = e.target.value
                  if (!isNaN(parseInt(input))) {
                    input = parseInt(input)
                  }
                  if (input === 'true') {
                    input = true
                  }
                  if (input === 'false') {
                    input = false
                  }

                  updateData(stateKey, input)
                }}
                className='bg-slate-100 border border-slate-200 p-1'
              />
            </div>
          </div>
          <div className='flex flex-col space-y-1 flex-1'>
            <div className='text-xs text-slate-500'>State</div>
            <div
              className='bg-slate-100 w-full flex-1 p-2 text-xs overflow-auto'
              style={{ maxHeight: 100 }}
            >
              <Syntax json={data} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Debugger
