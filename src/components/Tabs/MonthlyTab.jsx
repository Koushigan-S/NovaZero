import React, { useEffect, useState } from "react";

// Get current or past month key
function getMonthKey(offset = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() + offset);
  return `${date.getFullYear()}-${date.getMonth() + 1}`;
}

// Optional: Month name label
function getMonthLabel(offset = 0) {
  const date = new Date();
  date.setMonth(date.getMonth() + offset);
  return date.toLocaleString("default", { month: "long", year: "numeric" });
}

const defaultGoals = [
  "💪 Gain 1kg muscle or visible tone",
  "📚 Complete 1 online certification",
  "🥗 Stick to diet plan 20+ days",
  "📦 Ship 1 major project feature",
  "🧠 Finish reading 1 book",
  "🏸 Train 12+ times (badminton/boxing)",
  "🧘‍♂️ Meditate or journal at least 10 days",
  "🌱 Improve sleep schedule by 20%"
];

function MonthlyTab() {
  const monthKey = getMonthKey();
  const lastMonthKey = getMonthKey(-1);
  const currentMonthLabel = getMonthLabel();
  const lastMonthLabel = getMonthLabel(-1);

  const [goals, setGoals] = useState(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroMonthlyGoals")) || {};
    if (!all[monthKey]) {
      const newGoals = [...defaultGoals].sort(() => 0.5 - Math.random()).slice(0, 6);
      all[monthKey] = newGoals;
      localStorage.setItem("novaZeroMonthlyGoals", JSON.stringify(all));
    }
    return all[monthKey];
  });

  const [completed, setCompleted] = useState(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroMonthly")) || {};
    return all[monthKey] || [];
  });

  const [lastStats, setLastStats] = useState(null);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroMonthly")) || {};
    all[monthKey] = completed;
    localStorage.setItem("novaZeroMonthly", JSON.stringify(all));
  }, [completed, monthKey]);

  useEffect(() => {
    const goals = JSON.parse(localStorage.getItem("novaZeroMonthlyGoals")) || {};
    const done = JSON.parse(localStorage.getItem("novaZeroMonthly")) || {};
    const prevGoals = goals[lastMonthKey] || [];
    const prevDone = done[lastMonthKey] || [];

    if (prevGoals.length) {
      const percent = Math.round((prevDone.length / prevGoals.length) * 100);
      setLastStats({
        month: lastMonthLabel,
        total: prevGoals.length,
        completed: prevDone.length,
        percent,
      });
    }
  }, [lastMonthKey]);

  const toggle = (goal) => {
    setCompleted(prev =>
      prev.includes(goal) ? prev.filter(g => g !== goal) : [...prev, goal]
    );
  };

  const percentage = Math.round((completed.length / goals.length) * 100);

  return (
    <div className="text-whiteText">
      <h2 className="text-2xl font-bold mb-2">📆 Monthly Goals</h2>
      <p className="text-cursedPurple mb-4 font-semibold">
        Tracking for: <span className="text-cursedGreen">{currentMonthLabel}</span>
      </p>

      <ul className="space-y-4">
        {goals.map((goal, i) => (
          <li key={i} className="flex items-center gap-2 bg-blackBg/40 px-4 py-2 rounded-lg border border-cursedBlue">
            <input
              type="checkbox"
              checked={completed.includes(goal)}
              onChange={() => toggle(goal)}
            />
            <span>{goal}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-cursedGreen text-sm">
        ✅ {completed.length} / {goals.length} completed ({percentage}%)
      </div>

      {lastStats && (
        <div className="mt-6 p-3 border border-cursedBlue rounded-xl bg-blackBg/40">
          <h3 className="text-cursedBlue font-semibold text-sm mb-1">
            📉 Last Month Summary ({lastStats.month})
          </h3>
          <p
            className={`text-sm ${
              lastStats.percent >= 75
                ? "text-cursedGreen"
                : lastStats.percent < 50
                ? "text-cursedRed"
                : "text-yellow-300"
            }`}
          >
            {lastStats.completed} / {lastStats.total} goals completed ({lastStats.percent}%)
          </p>
        </div>
      )}
    </div>
  );
}

export default MonthlyTab;
