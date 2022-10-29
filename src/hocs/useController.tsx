import Controller from '../components/Controller/Controller'
import React from 'react'

export interface ComponentProps {}

export default function useController<T>(controller: string, Component: React.ComponentType<T>) {
  return (props: T) => {
    const { ...native } = props
    return (
      <Controller controller={controller}>
        {/* @ts-ignore */}
        <Component {...native} />
      </Controller>
    )
  }
}
