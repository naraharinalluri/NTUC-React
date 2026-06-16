import { useAuth } from '@/hooks/use-auth'
import { ParentLayout } from './parent-layout'
import { StaffLayout } from './staff-layout'

export function AppLayout() {
  const { isParentPortal } = useAuth()

  return isParentPortal ? <ParentLayout /> : <StaffLayout />
}
