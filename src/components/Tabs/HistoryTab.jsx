import React from 'react';

function getHistoryFromStorage(key) {
  const data = JSON.parse(localStorage.getItem(key));
  if (!data) return [];
  return data.filter((item) => item.done).map((item) => item.text);
}

function HistoryTab() {
  const daily = getHistoryFromStorage('dailyChecklist');
  const weekly = getHistoryFromStorage('weeklyGoals');
  const weekend = getHistoryFromStorage('weekendTasks');
  const monthly = getHistoryFromStorage('monthlyGoals');
  const yearly = getHistoryFromStorage('yearlyGoals');
  const workout = getHistoryFromStorage('workoutTab');
  const diet = getHistoryFromStorage('dietChecklist');

  return (
    <div className="bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-cursedPurple shadow-md">
      <h2 className="text-xl text-cursedPurple font-semibold mb-4 text-center">
        Streak Archive 📅🔥
      </h2>

      <div className="space-y-4 text-sm">
        {[
          { label: 'Daily', items: daily },
          { label: 'Weekly', items: weekly },
          { label: 'Weekend', items: weekend },
          { label: 'Monthly', items: monthly },
          { label: 'Yearly', items: yearly },
          { label: 'Workout', items: workout },
          { label: 'Diet', items: diet },
        ].map(({ label, items }) => (
          <div key={label}>
            <h3 className="text-cursedBlue font-semibold underline mb-2">
              {label} Logs
            </h3>
            {items.length > 0 ? (
              <ul className="list-disc list-inside space-y-1">
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="italic text-gray-400">No entries yet.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HistoryTab;
