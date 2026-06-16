import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function HelpCenterPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Help center coming soon</p>
        </CardContent>
      </Card>
    </div>
  )
}
