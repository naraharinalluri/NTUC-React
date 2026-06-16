/**
 * MOCK API Layer
 *
 * This module provides typed service functions that simulate a real backend.
 * All data is stored in-memory; mutations update the store.
 * Latency is simulated with sleep() to test loading states.
 *
 * Assumptions:
 * - Backend provides REST APIs for transfer, user, notification, centre, and report domains
 * - Authentication uses JWT tokens in httpOnly cookies (handled by backend)
 * - WebSocket at /ws/v1/notifications broadcasts real-time events
 * - File uploads handled separately (mocked here)
 */

export * from './auth'
export * from './transfers'
export * from './users'
export * from './notifications'
export * from './centres'
export * from './reports'

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

export { sleep }
