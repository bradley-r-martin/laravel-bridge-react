import BridgeContext from '../components/Bridge/BridgeContext'
import { useContext } from 'react'

export default function useBridge() {
  const context = useContext(BridgeContext)
  if (!context) {
    throw new Error('You cannot use useBridge outside of a Bridge component')
  }
  return context
}
