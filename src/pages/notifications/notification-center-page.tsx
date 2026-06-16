import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function NotificationCenterPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>
      <Card>
        <CardHeader>
          <CardTitle>Notification Center</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Notification center component coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
