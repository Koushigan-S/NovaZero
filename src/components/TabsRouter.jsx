import React, { useState, useRef } from "react";

import DailyTab from "./tabs/DailyTab";
import WeeklyTab from "./tabs/WeeklyTab";
import MonthlyTab from "./tabs/MonthlyTab";
import YearlyTab from "./tabs/YearlyTab";
import WorkoutTab from "./tabs/WorkoutTab";
import DietTab from "./tabs/DietTab";
import WeekendTab from "./tabs/WeekendTab";
import QuotesTab from "./tabs/QuotesTab";
import UnlockablesTab from "./tabs/UnlockablesTab";
import ProfileTab from "./tabs/ProfileTab";


const TabsRouter = () => {
  const [activeTab, setActiveTab] = useState("Daily");
  const touchStartX = useRef(null);

  const tabs = [
    "Daily", "Workout", "Diet", "Weekend", "Weekly",
    "Monthly", "Yearly", "Streak", "Quotes", "Unlocks", "Profile"
  ];

  const getAuraClass = (tab) => {
    switch (tab) {
      case "Daily": return "aura-blue";
      case "Workout": return "aura-red";
      case "Diet": return "aura-green";
      case "Quotes": return "aura-gold";
      case "Streak": return "aura-cursed";
      case "Profile": return "aura-gray";
      case "Weekend": return "aura-electric";
      case "Weekly": return "aura-time";
      case "Monthly": return "aura-lunar";
      case "Yearly": return "aura-galaxy";
      case "Unlocks": return "aura-relic";
      default: return "";
    }
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchEndX - touchStartX.current;
    const threshold = 50;

    if (Math.abs(diff) > threshold) {
      const currentIndex = tabs.findIndex((tab) => tab === activeTab);
      const newIndex = diff > 0 ? currentIndex - 1 : currentIndex + 1;
      if (newIndex >= 0 && newIndex < tabs.length) {
        setActiveTab(tabs[newIndex]);
      }
    }

    touchStartX.current = null;
  };

  const renderTab = () => {
    switch (activeTab) {
      case "Daily": return <DailyTab />;
      case "Workout": return <WorkoutTab />;
      case "Diet": return <DietTab />;
      case "Weekend": return <WeekendTab />;
      case "Weekly": return <WeeklyTab />;
      case "Monthly": return <MonthlyTab />;
      case "Yearly": return <YearlyTab />;
      case "Streak": return <StreakWidget />;
      case "Quotes": return <QuotesTab />;
      case "Unlocks": return <UnlockablesTab />;
      case "Profile": return <ProfileTab />;
      default: return null;
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`transition-all duration-500 px-4 ${getAuraClass(activeTab)}`}
    >
      {/* Tab Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 pt-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`px-4 py-1 rounded-md border border-whiteText/10 transition-all duration-300 shadow ${
              activeTab === tab
                ? "bg-gradient-to-r from-cursedBlue to-cursedPurple text-whiteText font-semibold shadow-md"
                : "bg-whiteText/5 text-whiteText hover:bg-whiteText/10"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Container */}
      <div className="rounded-xl border border-cursedGreen/40 shadow-[0_0_20px_#38f28d55] p-4 md:p-6 bg-black/40 backdrop-blur-sm">
        {renderTab()}
      </div>
    </div>
  );
};

export default TabsRouter;
