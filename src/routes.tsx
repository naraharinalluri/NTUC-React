/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ProtectedRoute } from '@/components/guards/protected-route'
import { LoadingSpinner } from '@/components/loading-spinner'

// Layouts
import { AppLayout } from '@/components/layout/app-layout'

// Pages
import { LoginPage } from '@/pages/login-page'
import { DashboardPage } from '@/pages/dashboard-page'
import { TransferListPage } from '@/pages/transfers/transfer-list-page'
import { TransferFormPage } from '@/pages/transfers/transfer-form-page'
import { TransferDetailPage } from '@/pages/transfers/transfer-detail-page'
import { NotificationCenterPage } from '@/pages/notifications/notification-center-page'
import { ProfilePage } from '@/pages/profile-page'
import { HelpCenterPage } from '@/pages/help-center-page'

const ReportsPage = lazy(() => import('@/pages/reports-page').then((m) => ({ default: m.ReportsPage })))

const NotFoundPage = () => <div className="flex items-center justify-center min-h-screen"><p>404 - Not Found</p></div>

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> },
      { path: 'dashboard', element: <DashboardPage /> },
      { path: 'transfers', element: <TransferListPage /> },
      { path: 'transfers/new', element: <TransferFormPage /> },
      { path: 'transfers/:id', element: <TransferDetailPage /> },
      { path: 'transfers/:id/edit', element: <TransferFormPage /> },
      { path: 'notifications', element: <NotificationCenterPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'reports', element: <Suspense fallback={<LoadingSpinner />}><ReportsPage /></Suspense> },
      { path: 'help', element: <HelpCenterPage /> },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
])
