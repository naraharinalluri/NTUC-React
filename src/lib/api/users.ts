import { sleep } from './index'
import type { UserRole } from './auth'

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  phone?: string
  status: string
  roles: UserRole[]
}

export interface UpdateProfileRequest {
  firstName: string
  lastName: string
  phone?: string
}

let profileStore: UserProfile = {
  id: 'user-1',
  email: '[REDACTED_EMAIL_ADDRESS_2]',
  firstName: 'Sarah',
  lastName: 'Johnson',
  phone: '+65 8234 5678',
  status: 'active',
  roles: [
    {
      id: 'role-1',
      roleName: 'parent',
      permissions: ['view_transfer', 'create_transfer', 'edit_transfer', 'cancel_transfer', 'manage_notifications'],
    },
  ],
}

export async function getProfile(): Promise<UserProfile> {
  await sleep(300)
  return profileStore
}

export async function updateProfile(req: UpdateProfileRequest): Promise<UserProfile> {
  await sleep(400)
  profileStore = {
    ...profileStore,
    firstName: req.firstName,
    lastName: req.lastName,
    phone: req.phone,
  }
  return profileStore
}
