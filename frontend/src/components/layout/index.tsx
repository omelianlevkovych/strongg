import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  Activity,
  BarChart3,
  Settings,
  Users,
  Dumbbell,
  Menu,
  X
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg bg-card hover:bg-accent transition-colors"
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div
          className={cn(
            'fixed inset-y-0 z-40 w-64 transform transition-transform duration-200 ease-in-out md:translate-x-0',
            isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full',
            'md:relative md:translate-x-0'
          )}
        >
          <div className="flex h-full flex-col bg-card border-r">
            <div className="flex items-center justify-between px-6 py-4 border-b">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Strongg
              </h1>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="flex-1 px-3 py-4 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href
                  const Icon = item.icon
                  return (
                    <button
                      key={item.name}
                      type="button"
                      onClick={() => {
                        navigate(item.href)
                        setIsMobileMenuOpen(false)
                      }}
                      className={cn(
                        'group flex items-center w-full px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200',
                        isActive
                          ? 'bg-primary text-primary-foreground shadow-md'
                          : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                      )}
                    >
                      <Icon
                        className={cn(
                          'mr-3 h-5 w-5 transition-transform duration-200',
                          isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:scale-110'
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

        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}
      </div>
    </div>
  )
} 