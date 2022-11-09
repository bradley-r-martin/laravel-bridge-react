import { useContext } from 'react'
import BridgeContext from '../components/Bridge/BridgeContext'

export default function useBridge() {
  const context = useContext(BridgeContext)
  if (!context) {
    throw new Error('You cannot use useBridge outside of a Bridge component')
  }
  return context
}
