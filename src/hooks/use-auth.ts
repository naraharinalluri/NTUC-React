import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '@/store'
import { setUser, clearUser, setLoading, setError } from '@/store/slices/auth-slice'
import * as authApi from '@/lib/api/auth'

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>()
  const { user, isAuthenticated, isLoading, error } = useSelector((state: RootState) => state.auth)

  const login = async (email: string, password: string) => {
    dispatch(setLoading(true))
    dispatch(setError(null))
    try {
      const result = await authApi.login({ email, password })
      dispatch(setUser(result))
      return result
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed'
      dispatch(setError(message))
      throw err
    } finally {
      dispatch(setLoading(false))
    }
  }

  const logout = async () => {
    dispatch(setLoading(true))
    try {
      await authApi.logout()
      dispatch(clearUser())
    } finally {
      dispatch(setLoading(false))
    }
  }

  const primaryRole = user?.roles[0]?.roleName ?? null
  const isParentPortal = primaryRole === 'parent' || primaryRole === 'guardian'

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    primaryRole,
    isParentPortal,
    login,
    logout,
  }
}
