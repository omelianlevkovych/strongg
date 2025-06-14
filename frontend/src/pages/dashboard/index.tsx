import { useState } from 'react'
import { format, subDays } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock data for demonstration
const mockWorkouts = Array.from({ length: 365 }, (_, i) => {
  const date = subDays(new Date(), i)
  return {
    date: format(date, 'yyyy-MM-dd'),
    exercises: Math.random() > 0.7 ? [
      { name: 'Bench Press', sets: 3, reps: 10, weight: 135 },
      { name: 'Squats', sets: 4, reps: 8, weight: 225 },
    ] : []
  }
})

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))

  const todayWorkout = mockWorkouts.find(w => w.date === selectedDate)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Workout
        </Button>
      </div>

      {/* Activity Calendar */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Activity Calendar</h2>
        <div className="grid grid-cols-53 gap-1">
          {mockWorkouts.map((workout) => (
            <div
              key={workout.date}
              className={cn(
                'aspect-square rounded-sm cursor-pointer transition-colors',
                workout.exercises.length > 0
                  ? 'bg-primary hover:bg-primary/80'
                  : 'bg-muted hover:bg-muted/80'
              )}
              onClick={() => setSelectedDate(workout.date)}
              title={`${workout.date}: ${workout.exercises.length} exercises`}
            />
          ))}
        </div>
      </div>

      {/* Today's Workout */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {format(new Date(selectedDate), 'MMMM d, yyyy')}
        </h2>
        {todayWorkout?.exercises.length ? (
          <div className="space-y-4">
            {todayWorkout.exercises.map((exercise, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div>
                  <h3 className="font-medium">{exercise.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {exercise.sets} sets × {exercise.reps} reps @ {exercise.weight}lbs
                  </p>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            No exercises recorded for this day
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">This Week</h3>
          <p className="text-2xl font-bold mt-2">
            {mockWorkouts.slice(0, 7).filter(w => w.exercises.length > 0).length} workouts
          </p>
        </div>
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">This Month</h3>
          <p className="text-2xl font-bold mt-2">
            {mockWorkouts.slice(0, 30).filter(w => w.exercises.length > 0).length} workouts
          </p>
        </div>
        <div className="bg-card rounded-lg p-6">
          <h3 className="text-sm font-medium text-muted-foreground">Total Exercises</h3>
          <p className="text-2xl font-bold mt-2">
            {mockWorkouts.reduce((acc, w) => acc + w.exercises.length, 0)}
          </p>
        </div>
      </div>
    </div>
  )
} 