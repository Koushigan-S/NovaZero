import React, { useState } from 'react';

const defaultWorkout = [
  // 🥊 Boxing Focus
  { id: 1, text: 'Shadow Boxing – 3 Rounds 🥊🪞', done: false },
  { id: 2, text: 'Footwork ladder drill 🔁', done: false },
  { id: 3, text: 'Punch combos – Jab, Cross, Hook 🧤', done: false },
  { id: 4, text: 'Core work – Plank + Russian twists 🧱🔥', done: false },

  // 🏸 Badminton Focus
  { id: 5, text: 'Shuttle toss warmup & pick-up drill 🏸', done: false },
  { id: 6, text: 'Shadow footwork – 6-point steps 👣', done: false },
  { id: 7, text: 'Smash+Drop shot ghost practice 💥🪂', done: false },
  { id: 8, text: 'Lower body – Squats + calf hops 🦵', done: false },
];

function WorkoutTab() {
  const [workoutList, setWorkoutList] = useState(() => {
    const stored = localStorage.getItem('workoutTab');
    return stored ? JSON.parse(stored) : defaultWorkout;
  });

  const toggleWorkout = (id) => {
    const updated = workoutList.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    setWorkoutList(updated);
    localStorage.setItem('workoutTab', JSON.stringify(updated));
  };

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-cursedRed shadow-md">
      <h2 className="text-xl text-cursedRed font-semibold mb-4 text-center">
        Training Dojo 🥋🔥
      </h2>
      <ul className="space-y-3">
        {workoutList.map((task) => (
          <li
            key={task.id}
            onClick={() => toggleWorkout(task.id)}
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

export default WorkoutTab;
