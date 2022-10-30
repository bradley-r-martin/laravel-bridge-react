import Controller from '../components/Controller/Controller'
import React from 'react'

export default function useController<T extends object>(
  controller: string,
  Component: React.ComponentType<T>,
) {
  const WrappedComponent = (props: T) => {
    const { ...native } = props
    return (
      <Controller controller={controller}>
        <Component {...native} />
      </Controller>
    )
  }
  WrappedComponent.displayName = 'useController(WrappedComponent)'
  return WrappedComponent
}
