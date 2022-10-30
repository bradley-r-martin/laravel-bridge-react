import ControllerStatus from '../components/Controller/ControllerStatus'
import { useContext } from 'react'

export default function useStatus() {
  const context = useContext(ControllerStatus)
  if (!context) {
    throw new Error('You cannot use useStatus outside of a Controller component')
  }
  return context
}
