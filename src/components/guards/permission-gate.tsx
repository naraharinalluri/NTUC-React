import { usePermissions } from '@/hooks/use-permissions'

type PermissionGateProps = {
  permission?: string | string[]
  role?: string | string[]
  fallback?: React.ReactNode
  children: React.ReactNode
}

export function PermissionGate({
  permission,
  role,
  fallback = null,
  children,
}: PermissionGateProps) {
  const { hasRole, hasAnyPermission } = usePermissions()

  let allowed = true

  if (permission) {
    const perms = Array.isArray(permission) ? permission : [permission]
    allowed = hasAnyPermission(...perms)
  }

  if (role && allowed) {
    const roles = Array.isArray(role) ? role : [role]
    allowed = roles.some(hasRole)
  }

  if (!allowed) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
