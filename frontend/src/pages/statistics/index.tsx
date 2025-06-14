import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { format, subDays } from 'date-fns'
import { Button } from '@/components/ui/button'

// Mock data for demonstration
const mockData = Array.from({ length: 30 }, (_, i) => {
  const date = subDays(new Date(), i)
  return {
    date: format(date, 'MMM d'),
    volume: Math.floor(Math.random() * 10000) + 5000,
    exercises: Math.floor(Math.random() * 10) + 5,
    prs: Math.floor(Math.random() * 3)
  }
}).reverse()

const mockPRs = [
  { exercise: 'Bench Press', weight: 225, date: '2024-03-15' },
  { exercise: 'Squats', weight: 315, date: '2024-03-10' },
  { exercise: 'Deadlift', weight: 405, date: '2024-03-05' },
  { exercise: 'Overhead Press', weight: 135, date: '2024-02-28' },
]

export default function Statistics() {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month')

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Statistics</h1>
        <div className="flex gap-2">
          <Button
            variant={timeRange === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeRange('week')}
          >
            Week
          </Button>
          <Button
            variant={timeRange === 'month' ? 'default' : 'outline'}
            onClick={() => setTimeRange('month')}
          >
            Month
          </Button>
          <Button
            variant={timeRange === 'year' ? 'default' : 'outline'}
            onClick={() => setTimeRange('year')}
          >
            Year
          </Button>
        </div>
      </div>

      {/* Volume Chart */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Training Volume</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="volume"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Exercise Distribution */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Exercise Distribution</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="exercises" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Personal Records */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Personal Records</h2>
        <div className="space-y-4">
          {mockPRs.map((pr, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-muted rounded-lg"
            >
              <div>
                <h3 className="font-medium">{pr.exercise}</h3>
                <p className="text-sm text-muted-foreground">
                  {pr.weight}lbs - {format(new Date(pr.date), 'MMMM d, yyyy')}
                </p>
              </div>
              <div className="text-sm text-muted-foreground">
                New PR! 🎉
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 