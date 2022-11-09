import { useContext } from 'react'
import ControllerData from '../components/Controller/ControllerData'

export default function useData() {
  const context = useContext(ControllerData)
  if (!context) {
    throw new Error('You cannot use useData outside of a Controller component')
  }
  return context
}
