import { sleep } from './index'

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthUser {
  id: string
  email: string
  firstName: string
  lastName: string
  roles: UserRole[]
}

export interface UserRole {
  id: string
  roleName: 'parent' | 'guardian' | 'teacher' | 'principal' | 'hq_staff' | 'admin'
  centreId?: string
  permissions: string[]
}

export interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
}

// Mock seed data - multiple users for testing
const mockUsers: Record<string, { password: string; user: AuthUser }> = {
  'parent@test.com': {
    password: 'password',
    user: {
      id: 'user-1',
      email: 'parent@test.com',
      firstName: 'Sarah',
      lastName: 'Johnson',
      roles: [
        {
          id: 'role-1',
          roleName: 'parent',
          permissions: ['view_transfer', 'create_transfer', 'edit_transfer', 'cancel_transfer', 'manage_notifications'],
        },
      ],
    },
  },
  'principal@test.com': {
    password: 'password',
    user: {
      id: 'user-2',
      email: 'principal@test.com',
      firstName: 'David',
      lastName: 'Smith',
      roles: [
        {
          id: 'role-2',
          roleName: 'principal',
          centreId: 'centre-1',
          permissions: [
            'view_transfer',
            'view_all_transfers',
            'approve_transfer',
            'reject_transfer',
            'view_reports',
            'manage_notifications',
          ],
        },
      ],
    },
  },
  'teacher@test.com': {
    password: 'password',
    user: {
      id: 'user-3',
      email: 'teacher@test.com',
      firstName: 'Emma',
      lastName: 'Brown',
      roles: [
        {
          id: 'role-3',
          roleName: 'teacher',
          centreId: 'centre-1',
          permissions: ['view_transfer', 'view_all_transfers', 'manage_notifications'],
        },
      ],
    },
  },
  'hqstaff@test.com': {
    password: 'password',
    user: {
      id: 'user-4',
      email: 'hqstaff@test.com',
      firstName: 'Michael',
      lastName: 'Chen',
      roles: [
        {
          id: 'role-4',
          roleName: 'hq_staff',
          permissions: ['view_transfer', 'view_all_transfers', 'view_reports', 'manage_notifications'],
        },
      ],
    },
  },
}

export async function login(req: LoginRequest): Promise<AuthUser> {
  await sleep(500)
  const entry = mockUsers[req.email]
  if (!entry || entry.password !== req.password) {
    throw new Error('Invalid email or password')
  }
  return entry.user
}

export async function logout(): Promise<void> {
  await sleep(200)
}

export async function getMe(): Promise<AuthUser> {
  await sleep(300)
  // In a real app, this would read from the session/token
  // For now, return the first user (would be read from auth context in real scenario)
  return Object.values(mockUsers)[0].user
}

export async function refreshToken(): Promise<void> {
  await sleep(200)
}
