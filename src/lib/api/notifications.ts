/* eslint-disable prefer-const */
import { sleep } from './index'

export interface Notification {
  id: string
  userId: string
  type: string
  title: string
  message: string
  read: boolean
  createdAt: string
  readAt?: string
  data?: Record<string, unknown>
}

export interface NotificationListParams {
  status?: 'read' | 'unread'
  type?: string
  limit?: number
  offset?: number
}

let notificationStore: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'transfer_status',
    title: 'Transfer Approved',
    message: 'Your transfer request for Emma has been approved.',
    read: true,
    createdAt: '2026-05-20T09:15:00Z',
    readAt: '2026-05-20T10:00:00Z',
    data: { transferId: 'transfer-2' },
  },
  {
    id: 'notif-2',
    userId: 'user-1',
    type: 'transfer_status',
    title: 'Request Under Review',
    message: 'Your transfer request for Michael is now under review.',
    read: true,
    createdAt: '2026-06-08T15:20:00Z',
    readAt: '2026-06-09T08:30:00Z',
    data: { transferId: 'transfer-3' },
  },
  {
    id: 'notif-3',
    userId: 'user-1',
    type: 'system',
    title: 'New Centre Features Available',
    message: 'Check out our new transfer tracking dashboard.',
    read: false,
    createdAt: '2026-06-15T16:45:00Z',
    data: {},
  },
  {
    id: 'notif-4',
    userId: 'user-1',
    type: 'transfer_status',
    title: 'Pending Your Request',
    message: 'Your transfer request for Lucas is waiting for review.',
    read: false,
    createdAt: '2026-06-10T11:00:00Z',
    data: { transferId: 'transfer-1' },
  },
]

export async function getNotifications(params?: NotificationListParams): Promise<Notification[]> {
  await sleep(350)

  let filtered = [...notificationStore]

  if (params?.status === 'unread') {
    filtered = filtered.filter((n) => !n.read)
  } else if (params?.status === 'read') {
    filtered = filtered.filter((n) => n.read)
  }

  if (params?.type) {
    filtered = filtered.filter((n) => n.type === params.type)
  }

  const limit = params?.limit ?? 10
  const offset = params?.offset ?? 0

  return filtered.slice(offset, offset + limit)
}

export async function markNotificationRead(id: string): Promise<Notification> {
  await sleep(250)

  const notif = notificationStore.find((n) => n.id === id)
  if (!notif) {
    throw new Error('Notification not found')
  }

  notif.read = true
  notif.readAt = new Date().toISOString()

  return notif
}

export function getUnreadCount(): number {
  return notificationStore.filter((n) => !n.read).length
}
