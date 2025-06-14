import { useState } from 'react'
import { format, subDays, startOfYear, endOfYear, eachDayOfInterval, getYear } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Dumbbell } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ContributionGrid, ContributionDay } from './contribution-grid'
import { ActivityRadarChart } from './activity-radar-chart'

// Mock data for demonstration
const mockWorkouts = Array.from({ length: 365 }, (_, i) => {
  const date = subDays(new Date(), i)
  const exercises = Math.random() > 0.7 ? [
    { name: 'Bench Press', sets: 3, reps: 10, weight: 135, type: 'Weight' },
    { name: 'Squats', sets: 4, reps: 8, weight: 225, type: 'Weight' },
    { name: 'Running', sets: 1, reps: 1, weight: 0, type: 'Cardio' },
    { name: 'Meditation', sets: 1, reps: 1, weight: 0, type: 'Mental' },
    { name: 'Walking', sets: 1, reps: 1, weight: 0, type: 'Walking' },
  ].filter(() => Math.random() > 0.5) : []
  const isPR = Math.random() > 0.95
  return {
    date: format(date, 'yyyy-MM-dd'),
    exercises,
    isPR
  }
})

interface Exercise {
  name: string
  sets: number
  reps: number
  weight: number
  type: string
}

// Only last 5 years
const years = Array.from({ length: 5 }, (_, i) => getYear(new Date()) - i)

export default function Dashboard() {
  const [selectedYear, setSelectedYear] = useState(getYear(new Date()))
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), 'yyyy-MM-dd'))
  const [isWorkoutModalOpen, setIsWorkoutModalOpen] = useState(false)
  const [newExercise, setNewExercise] = useState<Exercise>({
    name: '',
    sets: 3,
    reps: 10,
    weight: 0,
    type: 'Weight'
  })

  // Filter workouts for the selected year
  const yearStart = startOfYear(new Date(selectedYear, 0, 1))
  const yearEnd = endOfYear(new Date(selectedYear, 11, 31))
  const daysInYear = eachDayOfInterval({ start: yearStart, end: yearEnd })
  const workoutsThisYear = mockWorkouts.filter(w => {
    const d = new Date(w.date)
    return d >= yearStart && d <= yearEnd
  })

  // For grid: count workouts per day
  const gridData: ContributionDay[] = daysInYear.map(day => {
    const dateStr = format(day, 'yyyy-MM-dd')
    const workout = workoutsThisYear.find(w => w.date === dateStr)
    return {
      date: day,
      count: workout ? workout.exercises.length : 0
    }
  })

  // PRs this year
  const prCount = workoutsThisYear.filter(w => w.isPR).length

  // Activity radar data (percentages)
  const radarTypes = ['Weight', 'Cardio', 'Walking', 'Meditation']
  const typeTotals: { [key: string]: number } = { Weight: 0, Cardio: 0, Walking: 0, Meditation: 0 }
  workoutsThisYear.forEach(w => w.exercises.forEach(e => {
    if (typeTotals[e.type] !== undefined) typeTotals[e.type]++
  }))
  const total = Object.values(typeTotals).reduce((a, b) => a + b, 0) || 1
  const radarData = radarTypes.map(type => ({
    type,
    value: Math.round((typeTotals[type] / total) * 100)
  }))

  // This week's workouts
  const weekWorkouts = mockWorkouts.slice(0, 7).filter(w => w.exercises.length > 0)

  const todayWorkout = workoutsThisYear.find(w => w.date === selectedDate)

  const handleAddExercise = () => {
    setIsWorkoutModalOpen(false)
    setNewExercise({ name: '', sets: 3, reps: 10, weight: 0, type: 'Weight' })
  }

  // Responsive cell size for grid
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768
  const cellSize = isMobile ? 12 : 24

  // PR days for grid
  const prDays = workoutsThisYear.filter(w => w.isPR).map(w => w.date)

  return (
    <div className="w-full min-h-screen">
      <div className="max-w-screen-lg mx-auto flex flex-col gap-4 px-2 sm:px-4 pt-6">
        {/* Top stats */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <div className="mt-2 text-lg text-foreground">
            <span className="font-semibold">{workoutsThisYear.filter(w => w.exercises.length > 0).length}</span> workouts in the last year
            <span className="mx-2">·</span>
            <span className="font-semibold">{prCount}</span> PRs this year
          </div>
        </div>

        {/* Year selector + Contribution grid */}
        <div className="flex flex-row gap-4 items-start w-full">
          {/* Year selector */}
          <div className="bg-card rounded-lg p-2 sm:p-4 flex flex-col gap-1 w-20 shrink-0">
            {years.map(y => (
              <Button
                key={y}
                variant={selectedYear === y ? 'default' : 'outline'}
                className="w-full justify-center px-0 py-1 text-xs"
                onClick={() => setSelectedYear(y)}
              >
                {y}
              </Button>
            ))}
          </div>
          {/* Contribution grid */}
          <div className="overflow-x-auto rounded-lg bg-card shadow-md p-2 flex flex-col items-center w-full">
            <ContributionGrid
              data={gridData}
              onDayClick={date => setSelectedDate(format(date, 'yyyy-MM-dd'))}
              selectedDate={new Date(selectedDate)}
              cellSize={cellSize}
              showLegend={false}
              prDays={prDays}
            />
          </div>
        </div>

        {/* Selected Day Workout */}
        <div className="bg-card rounded-lg p-4 sm:p-6 w-full">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
            <h2 className="text-xl font-semibold text-foreground">
              {format(new Date(selectedDate), 'MMMM d, yyyy')}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsWorkoutModalOpen(true)}
            >
              <Dumbbell className="mr-2 h-4 w-4" />
              Add Exercise
            </Button>
          </div>
          {todayWorkout?.exercises.length ? (
            <div className="space-y-4">
              {todayWorkout.exercises.map((exercise, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <h3 className="font-medium text-foreground">{exercise.name}</h3>
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

        {/* Activity overview */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="bg-card rounded-lg p-4 sm:p-6 flex flex-col gap-4 w-full md:w-1/2">
            <div className="font-semibold mb-2 text-foreground">Activity overview</div>
            <div className="mb-2">
              <div className="text-sm text-muted-foreground mb-1">This week</div>
              <ul className="list-disc ml-5">
                {weekWorkouts.map((w, i) => (
                  <li key={i} className="text-foreground">
                    {format(new Date(w.date), 'EEE, MMM d')}: {w.exercises.length} exercises
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <div className="w-full max-w-xs mx-auto">
              <ActivityRadarChart data={radarData} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Workout Modal */}
      <Dialog open={isWorkoutModalOpen} onOpenChange={setIsWorkoutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Exercise</DialogTitle>
            <DialogDescription>
              Add a new exercise to your workout for {format(new Date(selectedDate), 'MMMM d, yyyy')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="exercise-name">Exercise Name</Label>
              <Input
                id="exercise-name"
                value={newExercise.name}
                onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                placeholder="e.g., Bench Press"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="sets">Sets</Label>
                <Input
                  id="sets"
                  type="number"
                  value={newExercise.sets}
                  onChange={(e) => setNewExercise({ ...newExercise, sets: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reps">Reps</Label>
                <Input
                  id="reps"
                  type="number"
                  value={newExercise.reps}
                  onChange={(e) => setNewExercise({ ...newExercise, reps: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={newExercise.weight}
                  onChange={(e) => setNewExercise({ ...newExercise, weight: Number(e.target.value) })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <select
                  id="type"
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                  value={newExercise.type}
                  onChange={e => setNewExercise({ ...newExercise, type: e.target.value })}
                >
                  <option value="Weight">Weight</option>
                  <option value="Cardio">Cardio</option>
                  <option value="Walking">Walking</option>
                  <option value="Meditation">Meditation</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsWorkoutModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddExercise}>
              Add Exercise
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 