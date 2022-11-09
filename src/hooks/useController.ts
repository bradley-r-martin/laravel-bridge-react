import { useContext } from 'react'
import ControllerContext from '../components/Controller/ControllerContext'

export default function useController() {
  const context = useContext(ControllerContext)
  if (!context) {
    throw new Error('You cannot use useController outside of a Controller component')
  }
  return context
}
