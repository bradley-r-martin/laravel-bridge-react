import Bridge from '../components/Bridge/Bridge'
import React from 'react'

export default function useBridge<T>(Component: React.ComponentType<T>) {
  return (props: T) => {
    const { ...native } = props
    return (
      <Bridge>
        {/* @ts-ignore */}
        <Component {...native} />
      </Bridge>
    )
  }
}
