import React, { useState } from 'react';

const defaultWeekend = [
  { id: 1, text: 'Badminton 2hr match 🏸', done: false },
  { id: 2, text: 'Boxing footwork drills 🥊', done: false },
  { id: 3, text: 'Deep dive: React + Framer Motion 🚀', done: false },
  { id: 4, text: 'Watch a Marvel/JJK movie 📽️', done: false },
  { id: 5, text: 'Write a weekly log 📝', done: false },
];

function WeekendTab() {
  const [list, setList] = useState(() => {
    const stored = localStorage.getItem('weekendTasks');
    return stored ? JSON.parse(stored) : defaultWeekend;
  });

  const toggle = (id) => {
    const updated = list.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setList(updated);
    localStorage.setItem('weekendTasks', JSON.stringify(updated));
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-cursedRed shadow-md">
      <h2 className="text-xl text-cursedRed font-semibold mb-4 text-center">
        Weekend Boost List 💥
      </h2>
      <ul className="space-y-3">
        {list.map((task) => (
          <li
            key={task.id}
            onClick={() => toggle(task.id)}
            className={`flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer ${
              task.done
                ? 'bg-cursedGreen/20 text-cursedGreen line-through'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <span>{task.text}</span>
            {task.done && <span>✅</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WeekendTab;
