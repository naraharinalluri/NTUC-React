import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import * as notificationApi from '@/lib/api/notifications'

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const updateCount = () => {
      const newCount = notificationApi.getUnreadCount()
      setUnreadCount(newCount)
    }

    updateCount()
    const interval = setInterval(updateCount, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative"
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-background border border-border rounded-md shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <p className="font-medium text-sm">Notifications</p>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <p className="text-xs text-muted-foreground p-4 text-center">
              You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
            </p>
            <Link
              to="/notifications"
              className="block text-center text-xs text-primary hover:underline p-3 border-t border-border"
              onClick={() => setIsOpen(false)}
            >
              View all notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
