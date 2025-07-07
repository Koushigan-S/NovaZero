import React, { useEffect, useState } from "react";

const dailyTasks = {
  0: ["🛌 Rest", "💧 Drink water", "🧘 Light stretching", "📖 Reflect"],
  1: ["🌅 Wake up before 6AM", "🥤 Drink water", "🏸 Badminton drills", "📚 1hr study", "🥗 Follow diet", "🚫 No distractions"],
  2: ["🧠 Mental prep", "🥤 Hydrate", "🥊 Shadow boxing", "📚 2hr deep work", "🥗 Stick to meal plan", "🧘 5 min meditation"],
  3: ["💡 Brainstorming session", "💧 Hydrate", "🏋️ Strength workout", "📖 Read 10 pages", "🥗 Eat clean", "🧼 Clean space"],
  4: ["🛏️ Early wakeup", "🥤 Water x3", "🏸 Shuttle practice", "📚 Review & revise", "🥗 Meal timing", "🎯 Focused task"],
  5: ["😴 Sleep journal", "💧 Lemon water", "🥊 Punch accuracy", "🧠 Weekly review", "🥗 Diet log", "📵 Low-screen day"],
  6: ["🧘‍♂️ Breathe work", "💧 Hydrate + Rest", "🚶 Long walk", "📚 Plan next week", "🧼 Reset desk", "🍲 Meal prep"]
};

function DailyTab() {
  const todayIndex = new Date().getDay(); // 0 (Sun) - 6 (Sat)
  const todayKey = new Date().toDateString();
  const todayTasks = dailyTasks[todayIndex];

  const [completed, setCompleted] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("novaZeroDaily")) || {};
    return saved[todayKey] || [];
  });

  useEffect(() => {
    const allSaves = JSON.parse(localStorage.getItem("novaZeroDaily")) || {};
    allSaves[todayKey] = completed;
    localStorage.setItem("novaZeroDaily", JSON.stringify(allSaves));
  }, [completed, todayKey]);

  const toggleTask = (task) => {
    setCompleted((prev) =>
      prev.includes(task)
        ? prev.filter((t) => t !== task)
        : [...prev, task]
    );
  };

  return (
    <div className="text-whiteText">
      <h2 className="text-2xl font-bold mb-3">☀️ Daily Habits - {todayKey}</h2>
      <ul className="space-y-2">
        {todayTasks.map((task, i) => (
          <li key={i} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={completed.includes(task)}
              onChange={() => toggleTask(task)}
            />
            <span>{task}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-cursedGreen">
        ✅ {completed.length} / {todayTasks.length} completed
      </p>
    </div>
  );
}

export default DailyTab;
