/* eslint-disable prefer-const */
import { sleep } from './index'

export type TransferStatus = 'pending' | 'under_review' | 'approved' | 'rejected' | 'cancelled'
export type TransferPriority = 'low' | 'normal' | 'high' | 'urgent'

export interface StatusHistoryEntry {
  id: string
  status: TransferStatus
  comments?: string
  changedBy: string
  changedByName?: string
  changedAt: string
}

export interface TransferDocument {
  id: string
  fileName: string
  fileSize: number
  mimeType: string
  uploadedAt: string
}

export interface Transfer {
  id: string
  userId: string
  fromCentreId: string
  toCentreId: string
  fromCentreName?: string
  toCentreName?: string
  childName: string
  childAge: number
  preferredStartDate: string
  status: TransferStatus
  priority: TransferPriority
  reason?: string
  submittedAt: string
  updatedAt: string
  statusHistory?: StatusHistoryEntry[]
  documents?: TransferDocument[]
}

export interface CreateTransferRequest {
  fromCentreId: string
  toCentreId: string
  childName: string
  childAge: number
  preferredStartDate: string
  priority: TransferPriority
  reason?: string
}

export interface UpdateTransferRequest {
  status?: 'approved' | 'rejected' | 'cancelled'
  comments?: string
  preferredStartDate?: string
}

export interface TransferListParams {
  status?: TransferStatus
  centreId?: string
  priority?: TransferPriority
  dateFrom?: string
  dateTo?: string
  limit?: number
  offset?: number
}

export interface TransferListResponse {
  transfers: Transfer[]
  total: number
  limit: number
  offset: number
}

export interface TransferStats {
  pending: number
  underReview: number
  approved: number
  rejected: number
  total: number
}

// Mock seed data
let transferStore: Transfer[] = [
  {
    id: 'transfer-1',
    userId: 'user-1',
    fromCentreId: 'centre-1',
    toCentreId: 'centre-2',
    fromCentreName: 'Clementi Centre',
    toCentreName: 'Bedok Centre',
    childName: 'Lucas Johnson',
    childAge: 4,
    preferredStartDate: '2026-08-01',
    status: 'pending',
    priority: 'normal',
    reason: 'Closer to home',
    submittedAt: '2026-06-10T10:30:00Z',
    updatedAt: '2026-06-10T10:30:00Z',
    statusHistory: [
      {
        id: 'hist-1',
        status: 'pending',
        changedBy: 'user-1',
        changedByName: 'Sarah Johnson',
        changedAt: '2026-06-10T10:30:00Z',
      },
    ],
  },
  {
    id: 'transfer-2',
    userId: 'user-1',
    fromCentreId: 'centre-1',
    toCentreId: 'centre-3',
    fromCentreName: 'Clementi Centre',
    toCentreName: 'Jurong Centre',
    childName: 'Emma Johnson',
    childAge: 5,
    preferredStartDate: '2026-07-15',
    status: 'approved',
    priority: 'high',
    reason: 'Better programs',
    submittedAt: '2026-05-01T14:00:00Z',
    updatedAt: '2026-05-20T09:15:00Z',
    statusHistory: [
      {
        id: 'hist-2',
        status: 'pending',
        changedBy: 'user-1',
        changedByName: 'Sarah Johnson',
        changedAt: '2026-05-01T14:00:00Z',
      },
      {
        id: 'hist-3',
        status: 'under_review',
        changedBy: 'user-2',
        changedByName: 'David Smith',
        changedAt: '2026-05-10T11:00:00Z',
      },
      {
        id: 'hist-4',
        status: 'approved',
        changedBy: 'user-2',
        changedByName: 'David Smith',
        changedAt: '2026-05-20T09:15:00Z',
        comments: 'Approved. Child shows good academic progress.',
      },
    ],
  },
  {
    id: 'transfer-3',
    userId: 'user-1',
    fromCentreId: 'centre-2',
    toCentreId: 'centre-1',
    fromCentreName: 'Bedok Centre',
    toCentreName: 'Clementi Centre',
    childName: 'Michael Johnson',
    childAge: 3,
    preferredStartDate: '2026-09-01',
    status: 'under_review',
    priority: 'normal',
    submittedAt: '2026-06-05T08:45:00Z',
    updatedAt: '2026-06-08T15:20:00Z',
    statusHistory: [
      {
        id: 'hist-5',
        status: 'pending',
        changedBy: 'user-1',
        changedByName: 'Sarah Johnson',
        changedAt: '2026-06-05T08:45:00Z',
      },
      {
        id: 'hist-6',
        status: 'under_review',
        changedBy: 'user-2',
        changedByName: 'David Smith',
        changedAt: '2026-06-08T15:20:00Z',
      },
    ],
  },
]

export async function getTransfers(params?: TransferListParams): Promise<TransferListResponse> {
  await sleep(400)

  let filtered = [...transferStore]

  if (params?.status) {
    filtered = filtered.filter((t) => t.status === params.status)
  }
  if (params?.centreId) {
    filtered = filtered.filter((t) => t.fromCentreId === params.centreId || t.toCentreId === params.centreId)
  }
  if (params?.priority) {
    filtered = filtered.filter((t) => t.priority === params.priority)
  }

  const limit = params?.limit ?? 10
  const offset = params?.offset ?? 0
  const paginated = filtered.slice(offset, offset + limit)

  return {
    transfers: paginated,
    total: filtered.length,
    limit,
    offset,
  }
}

export async function getTransferById(id: string): Promise<Transfer> {
  await sleep(300)
  const transfer = transferStore.find((t) => t.id === id)
  if (!transfer) {
    throw new Error('Transfer not found')
  }
  return transfer
}

export async function createTransfer(req: CreateTransferRequest): Promise<Transfer> {
  await sleep(500)

  const newTransfer: Transfer = {
    id: `transfer-${Date.now()}`,
    userId: 'user-1', // would be current user in real app
    fromCentreId: req.fromCentreId,
    toCentreId: req.toCentreId,
    childName: req.childName,
    childAge: req.childAge,
    preferredStartDate: req.preferredStartDate,
    status: 'pending',
    priority: req.priority,
    reason: req.reason,
    submittedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    statusHistory: [
      {
        id: `hist-${Date.now()}`,
        status: 'pending',
        changedBy: 'user-1',
        changedByName: 'Sarah Johnson',
        changedAt: new Date().toISOString(),
      },
    ],
  }

  transferStore.push(newTransfer)
  return newTransfer
}

export async function updateTransfer(id: string, req: UpdateTransferRequest): Promise<Transfer> {
  await sleep(400)

  const transfer = transferStore.find((t) => t.id === id)
  if (!transfer) {
    throw new Error('Transfer not found')
  }

  if (req.status) {
    transfer.status = req.status
    transfer.statusHistory?.push({
      id: `hist-${Date.now()}`,
      status: req.status,
      changedBy: 'user-2', // would be current user (principal/staff)
      changedByName: 'David Smith',
      changedAt: new Date().toISOString(),
      comments: req.comments,
    })
  }

  if (req.preferredStartDate) {
    transfer.preferredStartDate = req.preferredStartDate
  }

  transfer.updatedAt = new Date().toISOString()

  return transfer
}

export async function getTransferStats(): Promise<TransferStats> {
  await sleep(300)

  return {
    pending: transferStore.filter((t) => t.status === 'pending').length,
    underReview: transferStore.filter((t) => t.status === 'under_review').length,
    approved: transferStore.filter((t) => t.status === 'approved').length,
    rejected: transferStore.filter((t) => t.status === 'rejected').length,
    total: transferStore.length,
  }
}
