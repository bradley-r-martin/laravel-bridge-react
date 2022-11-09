import React from 'react'
import Bridge from '../components/Bridge/Bridge'

export default function useBridge<T extends object>(Component: React.ComponentType<T>) {
  const WrapperComponent = (props: T) => {
    const { ...native } = props
    return (
      <Bridge>
        <Component {...native} />
      </Bridge>
    )
  }
  WrapperComponent.displayName = 'useBridge(WrapperComponent)'
  return WrapperComponent
}
