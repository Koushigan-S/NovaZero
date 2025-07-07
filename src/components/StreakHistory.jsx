import React, { useEffect, useState } from 'react';

const STREAK_LOG_KEY = 'novaZeroHistory';

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { weekday: 'short' }); // e.g. Mon, Tue
}

function StreakHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem(STREAK_LOG_KEY)) || [];
    setHistory(stored.slice(-30)); // last 30 days
  }, []);

  return (
    <div className="bg-blackBg rounded-xl p-4 border border-cursedBlue shadow-md mt-6 text-whiteText">
      <h3 className="text-lg font-semibold text-cursedBlue mb-3">📅 Streak History (30 Days)</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3">
          {history.map((entry, idx) => (
            <div
              key={idx}
              className={`w-12 h-12 min-w-[3rem] rounded-full flex flex-col items-center justify-center transition-transform duration-300 ease-out ${
                entry.done ? 'bg-cursedBlue animate-streak' : 'bg-gray-700 animate-fade'
              }`}
            >
              <span className="text-xs font-medium">{formatDate(entry.date)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default StreakHistory;
