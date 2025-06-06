import { useEffect, useState } from 'react';
import './App.css';

interface Workout {
  id: string;
  date: string;
}

export function App() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/workouts')
      .then((r) => r.json())
      .then(setWorkouts)
      .catch(console.error);
  }, []);

  return (
    <div className="list">
      <h1>Workouts</h1>
      <ul>
        {workouts.map((w) => (
          <li key={w.id}>{w.date}</li>
        ))}
      </ul>
    </div>
  );
}
