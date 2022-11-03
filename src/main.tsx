import React, { useState } from 'react'

import Bridge from './components/Bridge/Bridge'
import Controller from './components/Controller/Controller'
import { Debugger } from './expose'
import ReactDOM from 'react-dom/client'

const Toggle = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <button className='p-1 text-xs bg-slate-100' onClick={() => setToggle(!toggle)}>
        Toggle
      </button>
      {toggle ? (
        <Controller controller='App\\Http\\Controllers\\Another'>
          <Debugger />
        </Controller>
      ) : null}
    </>
  )
}

const ToggleTwo = () => {
  const [toggle, setToggle] = useState(false)
  return (
    <>
      <button className='p-1 text-xs bg-slate-100' onClick={() => setToggle(!toggle)}>
        Toggle two
      </button>
      {toggle ? (
        <>
          <Controller controller='App\Http\Controllers\another'>
            <Debugger />
          </Controller>
          <Controller controller='App\Http\Controllers\Another'>
            <Debugger />
          </Controller>
        </>
      ) : null}
    </>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Bridge>
      <Controller controller='App\Http\Controllers\Test'>
        <Debugger />
      </Controller>
      <Controller controller='App\Http\Controllers\Test'>
        <Debugger />
      </Controller>
      <Toggle />
      <ToggleTwo />
    </Bridge>
  </React.StrictMode>,
)
