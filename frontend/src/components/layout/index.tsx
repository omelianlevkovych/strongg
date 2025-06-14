import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Activity,
  BarChart3,
  Settings,
  Users,
  Dumbbell
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Activity },
  { name: 'Statistics', href: '/statistics', icon: BarChart3 },
  { name: 'Friends', href: '/friends', icon: Users },
  { name: 'Workout Creator', href: '/workout-creator', icon: Dumbbell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <div className="hidden w-64 flex-col fixed inset-y-0 md:flex">
          <div className="flex flex-col flex-grow pt-5 bg-card overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <h1 className="text-2xl font-bold">Strongg</h1>
            </div>
            <div className="mt-5 flex-1 flex flex-col">
              <nav className="flex-1 px-2 pb-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => navigate(item.href)}
                      className={cn(
                        'group flex items-center w-full px-2 py-2 text-sm font-medium rounded-md text-left',
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <Icon
                        className={cn(
                          'mr-3 h-5 w-5',
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground'
                        )}
                      />
                      {item.name}
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 md:pl-64">
          <main className="flex-1">
            <div className="py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
} 