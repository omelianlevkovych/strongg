import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'

// Mock data for demonstration
const mockExercises = [
  { id: 1, name: 'Bench Press', category: 'Chest' },
  { id: 2, name: 'Squats', category: 'Legs' },
  { id: 3, name: 'Deadlift', category: 'Back' },
  { id: 4, name: 'Overhead Press', category: 'Shoulders' },
  { id: 5, name: 'Pull-ups', category: 'Back' },
  { id: 6, name: 'Dips', category: 'Chest' },
  { id: 7, name: 'Lunges', category: 'Legs' },
  { id: 8, name: 'Bicep Curls', category: 'Arms' },
]

interface Exercise {
  id: number
  name: string
  sets: number
  reps: number
  weight: number
}

export default function WorkoutCreator() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [selectedExercise, setSelectedExercise] = useState<number | null>(null)

  const addExercise = () => {
    if (selectedExercise) {
      const exercise = mockExercises.find(e => e.id === selectedExercise)
      if (exercise) {
        setExercises([
          ...exercises,
          {
            id: exercise.id,
            name: exercise.name,
            sets: 3,
            reps: 10,
            weight: 0
          }
        ])
        setSelectedExercise(null)
      }
    }
  }

  const removeExercise = (id: number) => {
    setExercises(exercises.filter(e => e.id !== id))
  }

  const updateExercise = (id: number, field: keyof Exercise, value: number) => {
    setExercises(exercises.map(e =>
      e.id === id ? { ...e, [field]: value } : e
    ))
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Create Workout</h1>
        <Button>Save Workout</Button>
      </div>

      {/* Exercise Selection */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Add Exercise</h2>
        <div className="flex gap-4">
          <select
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors"
            value={selectedExercise || ''}
            onChange={(e) => setSelectedExercise(Number(e.target.value))}
          >
            <option value="">Select an exercise</option>
            {mockExercises.map(exercise => (
              <option key={exercise.id} value={exercise.id}>
                {exercise.name} ({exercise.category})
              </option>
            ))}
          </select>
          <Button onClick={addExercise}>
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </div>
      </div>

      {/* Exercise List */}
      <div className="bg-card rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Exercises</h2>
        <div className="space-y-4">
          {exercises.map(exercise => (
            <div
              key={exercise.id}
              className="flex items-center gap-4 p-4 bg-muted rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium">{exercise.name}</h3>
                <div className="flex gap-4 mt-2">
                  <div>
                    <label className="text-sm text-muted-foreground">Sets</label>
                    <input
                      type="number"
                      className="w-20 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exercise.sets}
                      onChange={(e) => updateExercise(exercise.id, 'sets', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Reps</label>
                    <input
                      type="number"
                      className="w-20 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exercise.reps}
                      onChange={(e) => updateExercise(exercise.id, 'reps', Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground">Weight (lbs)</label>
                    <input
                      type="number"
                      className="w-20 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm"
                      value={exercise.weight}
                      onChange={(e) => updateExercise(exercise.id, 'weight', Number(e.target.value))}
                    />
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeExercise(exercise.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          {exercises.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No exercises added yet
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 