import ControllerExceptions from '../components/Controller/ControllerExceptions'
import { useContext } from 'react'

export default function useExceptions() {
  const context = useContext(ControllerExceptions)
  if (!context) {
    throw new Error('You cannot use useExceptions outside of a Controller component')
  }
  return context
}
