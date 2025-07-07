import React, { useState } from 'react';

const defaultYearlyGoals = [
  { id: 1, text: 'Crack CompTIA Security+ & CEH 📜', done: false },
  { id: 2, text: 'Build NovaZero habit tracker full stack 🧠⚙️', done: false },
  { id: 3, text: 'Launch 2 indie games (Into the Wilderness, Cars World Tour) 🎮', done: false },
  { id: 4, text: 'Boxing transformation – stamina, reflex, core 🥊🔥', done: false },
  { id: 5, text: 'Apply to ETH Zürich with full profile 🇨🇭🧾', done: false },
];

function YearlyTab() {
  const [goals, setGoals] = useState(() => {
    const stored = localStorage.getItem('yearlyGoals');
    return stored ? JSON.parse(stored) : defaultYearlyGoals;
  });

  const toggleGoal = (id) => {
    const updated = goals.map((g) =>
      g.id === id ? { ...g, done: !g.done } : g
    );
    setGoals(updated);
    localStorage.setItem('yearlyGoals', JSON.stringify(updated));
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-cursedPurple shadow-md">
      <h2 className="text-xl text-cursedPurple font-semibold mb-4 text-center">
        Yearly Destiny Tracker ✨📅
      </h2>
      <ul className="space-y-3">
        {goals.map((goal) => (
          <li
            key={goal.id}
            onClick={() => toggleGoal(goal.id)}
            className={`flex items-center justify-between px-4 py-2 rounded-xl cursor-pointer ${
              goal.done
                ? 'bg-cursedGreen/20 text-cursedGreen line-through'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <span>{goal.text}</span>
            {goal.done && <span>✅</span>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default YearlyTab;
