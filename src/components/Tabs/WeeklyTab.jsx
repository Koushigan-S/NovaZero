import React, { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function getWeekKey(offset = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offset * 7);
  const year = date.getFullYear();
  const jan1 = new Date(year, 0, 1);
  const week = Math.ceil(((date - jan1) / (1000 * 60 * 60 * 24) + jan1.getDay() + 1) / 7);
  return `${year}-W${week}`;
}

const taskPool = [
  "🏸 3 intense badminton drills",
  "🥊 2 advanced shadow boxing routines",
  "📚 Complete 4 focused study sessions",
  "🧠 Reflect and journal twice",
  "🧘‍♂️ Meditate 10 mins 3x this week",
  "📵 Reduce phone time under 5hr avg",
  "🥗 Stick to diet for 5+ days",
  "🚀 Progress 1 project milestone",
  "🧼 Clean space midweek",
  "🎯 Plan next week by Sunday"
];

function WeeklyTab() {
  const weekKey = getWeekKey();
  const lastWeekKey = getWeekKey(-1);
  const twoWeekAgoKey = getWeekKey(-2);

  const [weeklyGoals, setWeeklyGoals] = useState(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroWeeklyGoals")) || {};
    if (!all[weekKey]) {
      const newGoals = [...taskPool].sort(() => 0.5 - Math.random()).slice(0, 6);
      all[weekKey] = newGoals;
      localStorage.setItem("novaZeroWeeklyGoals", JSON.stringify(all));
    }
    return all[weekKey];
  });

  const [completed, setCompleted] = useState(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroWeekly")) || {};
    return all[weekKey] || [];
  });

  const [notes, setNotes] = useState(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroWeeklyNotes")) || {};
    return all[weekKey] || {};
  });

  const [last3WeeksData, setLast3WeeksData] = useState([]);

  // Save state
  useEffect(() => {
    const goals = JSON.parse(localStorage.getItem("novaZeroWeeklyGoals")) || {};
    goals[weekKey] = weeklyGoals;
    localStorage.setItem("novaZeroWeeklyGoals", JSON.stringify(goals));

    const comp = JSON.parse(localStorage.getItem("novaZeroWeekly")) || {};
    comp[weekKey] = completed;
    localStorage.setItem("novaZeroWeekly", JSON.stringify(comp));

    const ns = JSON.parse(localStorage.getItem("novaZeroWeeklyNotes")) || {};
    ns[weekKey] = notes;
    localStorage.setItem("novaZeroWeeklyNotes", JSON.stringify(ns));
  }, [weeklyGoals, completed, notes, weekKey]);

  // Load past 3 weeks data
  useEffect(() => {
    const goalData = JSON.parse(localStorage.getItem("novaZeroWeeklyGoals")) || {};
    const completeData = JSON.parse(localStorage.getItem("novaZeroWeekly")) || {};

    const keys = [twoWeekAgoKey, lastWeekKey, weekKey];
    const chartData = keys.map(key => ({
      name: key.replace("2025-", ""), // cleaner label
      completed: (completeData[key] || []).length,
      total: (goalData[key] || []).length,
    }));

    setLast3WeeksData(chartData);
  }, [completed]);

  const toggleGoal = (goal) => {
    setCompleted((prev) =>
      prev.includes(goal) ? prev.filter((g) => g !== goal) : [...prev, goal]
    );
  };

  const handleNoteChange = (goal, value) => {
    setNotes(prev => ({ ...prev, [goal]: value }));
  };

  const regenerateGoals = () => {
    const newGoals = [...taskPool].sort(() => 0.5 - Math.random()).slice(0, 6);
    setWeeklyGoals(newGoals);
    setCompleted([]);
    setNotes({});
  };

  return (
    <div className="text-whiteText">
      <h2 className="text-2xl font-bold mb-2">📅 Weekly Goals</h2>
      <p className="text-sm text-cursedPurple mb-4">Tracking for: <strong>{weekKey}</strong></p>

      <ul className="space-y-4">
        {weeklyGoals.map((goal, i) => (
          <li key={i} className="bg-blackBg/30 p-3 rounded-xl border border-cursedBlue space-y-2">
            <label className="flex items-center gap-2 font-medium">
              <input
                type="checkbox"
                checked={completed.includes(goal)}
                onChange={() => toggleGoal(goal)}
              />
              {goal}
            </label>
            <textarea
              className="w-full p-2 bg-blackBg border border-cursedPurple text-sm text-white rounded-md"
              placeholder="📝 Add a quick note..."
              value={notes[goal] || ""}
              onChange={(e) => handleNoteChange(goal, e.target.value)}
            />
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-cursedGreen text-sm">
          ✅ {completed.length} / {weeklyGoals.length} completed
        </p>
        <button
          onClick={regenerateGoals}
          className="text-xs px-4 py-1 rounded-full bg-cursedRed hover:bg-red-800 transition-all"
        >
          🔁 Regenerate this week’s goals
        </button>
      </div>

      <div className="mt-8">
        <h3 className="text-cursedBlue font-semibold mb-2 text-sm">📊 Last 3 Weeks Comparison</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={last3WeeksData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="completed" fill="#00ff9f" />
            <Bar dataKey="total" fill="#556677" fillOpacity={0.2} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default WeeklyTab;
