// Full updated StreakProgress.jsx with:
// ✅ Animated line chart
// ✅ Weekly average stats (color-coded)
// ✅ Pie chart for completion ratio
// ✅ Month-by-month success bars
// ✅ Clickable breakdown panel per month

import React, { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from 'recharts';

const STREAK_LOG_KEY = 'novaZeroHistory';

function StreakProgress() {
  const [chartData, setChartData] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [monthData, setMonthData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [monthDetails, setMonthDetails] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STREAK_LOG_KEY)) || [];

    const data = stored.slice(-30).map((entry) => ({
      name: new Date(entry.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' }),
      streak: entry.done ? 1 : 0,
      date: entry.date
    }));
    setChartData(data);

    const weeklyChunks = [];
    for (let i = 0; i < data.length; i += 7) {
      weeklyChunks.push(data.slice(i, i + 7));
    }
    const weeklyAverages = weeklyChunks.map((week, idx) => {
      const total = week.reduce((acc, day) => acc + day.streak, 0);
      return {
        name: `Week ${idx + 1}`,
        average: (total / week.length).toFixed(2),
      };
    });
    setWeeklyStats(weeklyAverages);

    const monthlySummary = {};
    stored.forEach((entry) => {
      const d = new Date(entry.date);
      const key = `${d.getFullYear()}-${d.getMonth()}`;
      if (!monthlySummary[key]) monthlySummary[key] = { completed: 0, total: 0 };
      monthlySummary[key].total++;
      if (entry.done) monthlySummary[key].completed++;
    });
    const formattedMonthData = Object.entries(monthlySummary).map(([key, value]) => {
      const [year, month] = key.split('-');
      const label = new Date(year, month).toLocaleString('default', { month: 'short', year: 'numeric' });
      const percent = Math.round((value.completed / value.total) * 100);
      return { month: label, rate: percent };
    });
    setMonthData(formattedMonthData);
  }, []);

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const monthlyEntries = chartData.filter((d) => {
    const dObj = new Date(d.date);
    return dObj.getMonth() === currentMonth && dObj.getFullYear() === currentYear;
  });
  const completedDays = monthlyEntries.filter(d => d.streak === 1).length;
  const totalDays = monthlyEntries.length;
  const monthlySuccessRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  const completed = chartData.filter(d => d.streak === 1).length;
  const missed = chartData.filter(d => d.streak === 0).length;
  const pieData = [
    { name: 'Completed', value: completed },
    { name: 'Missed', value: missed }
  ];
  const PIE_COLORS = ['#3ab7f2', '#d32f2f'];

  const handleMonthClick = (label) => {
    const matchedMonth = new Date(label);
    const month = matchedMonth.getMonth();
    const year = matchedMonth.getFullYear();
    const raw = JSON.parse(localStorage.getItem(STREAK_LOG_KEY)) || [];
    const filtered = raw.filter((entry) => {
      const d = new Date(entry.date);
      return d.getMonth() === month && d.getFullYear() === year;
    });
    setSelectedMonth(label);
    setMonthDetails(filtered);
  };

  return (
    <div className="bg-blackBg border border-cursedBlue rounded-xl p-4 mt-6 shadow-md text-whiteText">
      <h3 className="text-lg font-semibold text-cursedBlue mb-4">📈 30-Day Streak Progress</h3>
      <ResponsiveContainer width="100%" height={200}>
        <LineChart data={chartData}>
          <XAxis dataKey="name" stroke="#94c6ff" />
          <YAxis domain={[0, 1]} />
          <Tooltip />
          <CartesianGrid stroke="#333" />
          <Line
            type="monotone"
            dataKey="streak"
            stroke="#3ab7f2"
            strokeWidth={2}
            dot={{ r: 4 }}
            isAnimationActive={true}
            animationDuration={800}
          />
        </LineChart>
      </ResponsiveContainer>

      {weeklyStats.length > 0 && (
        <div className="mt-4 text-xs space-y-1">
          <h4 className="text-cursedBlue font-semibold mb-1">📅 Weekly Averages</h4>
          {weeklyStats.map((week, i) => {
            const avg = parseFloat(week.average);
            let color = 'text-cursedRed';
            if (avg >= 0.9) color = 'text-cursedGreen';
            else if (avg >= 0.6) color = 'text-yellow-400';
            return (
              <p key={i} className={`${color}`}>{week.name}: {week.average} / 1</p>
            );
          })}
        </div>
      )}

      <div className="mt-6">
        <h4 className="text-cursedBlue font-semibold mb-2 text-sm">🥧 Completion Pie (Last 30d)</h4>
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={60} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className={`mt-4 text-sm text-center font-semibold ${
        monthlySuccessRate >= 90 ? 'text-cursedGreen'
        : monthlySuccessRate >= 60 ? 'text-yellow-400'
        : 'text-cursedRed'
      }`}>
        📆 {today.toLocaleString('default', { month: 'long' })} Success Rate: {monthlySuccessRate}%
      </div>

      <div className="mt-6">
        <h4 className="text-cursedBlue font-semibold mb-2 text-sm">📊 Month-by-Month Success</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={monthData} onClick={({ activeLabel }) => handleMonthClick(activeLabel)}>
            <XAxis dataKey="month" stroke="#94c6ff" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Bar dataKey="rate" fill="#3ab7f2" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {selectedMonth && (
        <div className="mt-4 bg-blackBg border border-cursedBlue rounded-lg p-4">
          <h4 className="text-cursedGreen font-bold mb-2">📅 {selectedMonth} Breakdown</h4>
          <p className="text-sm text-whiteText mb-2">
            Total Days: {monthDetails.length}, Completed: {monthDetails.filter(d => d.done).length}, Missed: {monthDetails.filter(d => !d.done).length}
          </p>
          <div className="grid grid-cols-4 gap-2 text-xs text-center">
            {monthDetails.map((d, i) => {
              const day = new Date(d.date).getDate();
              return (
                <div key={i} className={`p-2 rounded ${d.done ? 'bg-cursedBlue text-white' : 'bg-gray-700 text-white/60'}`}>
                  {day < 10 ? `0${day}` : day}
                </div>
              );
            })}
          </div>
          <button
            onClick={() => setSelectedMonth(null)}
            className="mt-4 text-xs text-cursedRed underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}

export default StreakProgress;