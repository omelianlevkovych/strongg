import { useEffect, useState } from 'react';
import './App.css';

interface Workout {
  id: string;
  date: string;
}

interface WorkoutFormProps {
  onClose: () => void;
  onSaved: () => void;
}

function WorkoutForm({ onClose, onSaved }: WorkoutFormProps) {
  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);
  const [name, setName] = useState('');
  const [sets, setSets] = useState(3);
  const [reps, setReps] = useState(10);

  const save = () => {
    const dto = {
      date,
      exercises: [
        {
          name,
          sets: Number(sets),
          reps: Number(reps),
        },
      ],
    };

    fetch('http://localhost:5000/workouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dto),
    })
      .then(() => onSaved())
      .catch(console.error);
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Add Workout</h2>
        <label>
          Date
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </label>
        <label>
          Exercise
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Sets
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Reps
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(parseInt(e.target.value, 10))}
          />
        </label>
        <button onClick={save}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

export function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/workouts')
      .then((r) => r.json())
      .then(setWorkouts)
      .catch(console.error);
  }, []);

  const workoutDates = new Set(workouts.map((w) => w.date));
  const today = new Date();
  const days: Date[] = [];
  for (let i = 0; i < 365; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - (364 - i));
    days.push(d);
  }

  const reload = () => {
    fetch('http://localhost:5000/workouts')
      .then((r) => r.json())
      .then((ws) => {
        setWorkouts(ws);
        setShowForm(false);
      })
      .catch(console.error);
  };

  return (
    <div className="container">
      <h1>Workouts</h1>
      <div className="grid">
        {days.map((d) => {
          const iso = d.toISOString().substring(0, 10);
          const active = workoutDates.has(iso);
          return <div key={iso} className={active ? 'cell active' : 'cell'} title={iso}></div>;
        })}
      </div>
      <button onClick={() => setShowForm(true)}>Add workout</button>
      {showForm && <WorkoutForm onClose={() => setShowForm(false)} onSaved={reload} />}
    </div>
  );
}
