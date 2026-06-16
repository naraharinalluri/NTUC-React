import { useMemo } from 'react'
import { useAuth } from './use-auth'

export function usePermissions() {
  const { user } = useAuth()

  const permissions = useMemo(
    () => new Set(user?.roles.flatMap((r) => r.permissions) ?? []),
    [user],
  )

  const hasPermission = (permission: string) => permissions.has(permission)
  const hasAnyPermission = (...perms: string[]) => perms.some(hasPermission)
  const hasRole = (role: string) => user?.roles.some((r) => r.roleName === role) ?? false

  return { hasPermission, hasAnyPermission, hasRole, permissions }
}
