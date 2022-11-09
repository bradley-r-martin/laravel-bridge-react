import { useContext } from 'react'
import ControllerActionsContext from '../components/Controller/ControllerActionsContext'

export default function useActions() {
  const context = useContext(ControllerActionsContext)
  if (!context) {
    throw new Error('You cannot use useActions outside of a Controller component')
  }
  return context
}
