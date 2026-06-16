import { useSelector } from 'react-redux'
import type { RootState } from '@/store'

type AuthProviderProps = {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  // Use selector to prevent unused variable warning
  useSelector((state: RootState) => state.auth.isAuthenticated)

  return <>{children}</>
}
