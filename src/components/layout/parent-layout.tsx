import { Outlet, Link, useLocation } from 'react-router-dom'
import { Menu, LogOut, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/mode-toggle'
import { NotificationBell } from '@/components/features/notifications/notification-bell'

export function ParentLayout() {
  const { user, logout } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const location = useLocation()

  const navItems = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'My Transfers', href: '/transfers' },
    { label: 'New Transfer', href: '/transfers/new' },
    { label: 'Notifications', href: '/notifications' },
    { label: 'Profile', href: '/profile' },
    { label: 'Help', href: '/help' },
  ]

  const handleLogout = async () => {
    await logout()
  }

  return (
    <div className="flex h-svh flex-col bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/dashboard" className="font-bold text-lg flex items-center gap-2">
              <span className="bg-primary text-primary-foreground flex h-7 w-7 items-center justify-center rounded-md text-sm">
                N
              </span>
              NTUC
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <ModeToggle />
            <Button variant="ghost" size="icon" asChild>
              <Link to="/profile" aria-label="Profile">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout} aria-label="Logout">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <nav className="w-64 border-r border-border bg-background/50">
            <div className="flex flex-col h-full">
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`block px-4 py-2 rounded-md text-sm transition-colors ${
                        location.pathname === item.href
                          ? 'bg-primary text-primary-foreground font-medium'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="border-t border-border p-4 text-xs text-muted-foreground">
                <p>{user?.firstName} {user?.lastName}</p>
                <p className="truncate">{user?.email}</p>
              </div>
            </div>
          </nav>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
