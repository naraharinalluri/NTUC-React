import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import * as transferApi from '@/lib/api/transfers'
import { useAuth } from '@/hooks/use-auth'
import { PermissionGate } from '@/components/guards/permission-gate'

export function DashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<transferApi.TransferStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    transferApi.getTransferStats().then(setStats).finally(() => setIsLoading(false))
  }, [])

  return (
    <div className="flex-1 space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome, {user?.firstName}!
        </h1>
        <p className="text-muted-foreground mt-2">
          Manage your transfer requests and track their status
        </p>
      </div>

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-24 bg-muted rounded" />
        </div>
      ) : stats ? (
        <>
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Pending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.pending}</div>
                <p className="text-xs text-muted-foreground">Awaiting review</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Under Review</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.underReview}</div>
                <p className="text-xs text-muted-foreground">Being processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.approved}</div>
                <p className="text-xs text-muted-foreground">Completed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.rejected}</div>
                <p className="text-xs text-muted-foreground">Not approved</p>
              </CardContent>
            </Card>
          </div>

          <PermissionGate permission="create_transfer">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Get started with a new transfer request</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link to="/transfers/new">Submit New Transfer</Link>
                </Button>
              </CardContent>
            </Card>
          </PermissionGate>
        </>
      ) : null}
    </div>
  )
}
