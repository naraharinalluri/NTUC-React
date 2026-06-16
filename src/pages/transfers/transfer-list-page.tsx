import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TransferListPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Transfers</h1>
        <p className="text-muted-foreground mt-2">View and manage all your transfer requests</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transfer Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Transfer list component coming soon</p>
          <Button asChild className="mt-4">
            <Link to="/transfers/new">Submit New Transfer</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
