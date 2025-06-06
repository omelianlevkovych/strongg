import { useState } from 'react';
import './App.css';

export function App() {
  const [days] = useState<number[]>(Array.from({ length: 42 }, () => 0));
  return (
    <div className="grid">
      {days.map((value, idx) => (
        <div key={idx} className={`cell level-${value}`}></div>
      ))}
    </div>
  );
}
