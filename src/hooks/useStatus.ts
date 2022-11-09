import { useContext } from 'react'
import ControllerStatus from '../components/Controller/ControllerStatus'

export default function useStatus() {
  const context = useContext(ControllerStatus)
  if (!context) {
    throw new Error('You cannot use useStatus outside of a Controller component')
  }
  return context
}
