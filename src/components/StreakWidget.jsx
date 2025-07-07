import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import BlueFlame from '../assets/blue-flame.json';
import GojoVoice from '../assets/gojo-lose.mp3';
import RewardGlitch from '/reward-glitch.mp3';

const STREAK_KEY = 'novaZeroStreak';
const LAST_DATE_KEY = 'novaZeroLastActive';
const STREAK_LOG_KEY = 'novaZeroHistory';

function getToday() {
  return new Date().toDateString();
}
function getYesterday() {
  const y = new Date();
  y.setDate(y.getDate() - 1);
  return y.toDateString();
}

function StreakWidget() {
  const [streak, setStreak] = useState(0);
  const [missedStreak, setMissedStreak] = useState(0);
  const [isTodayDone, setIsTodayDone] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [rewardMessage, setRewardMessage] = useState('');
  const [auraUnlocked, setAuraUnlocked] = useState(false);
  const [domainUnlocked, setDomainUnlocked] = useState(false);
  const [devLogs, setDevLogs] = useState([]);
  const [showLogs, setShowLogs] = useState(false);
  const rewardTriggered = useRef(false);

  const logDev = (msg) => {
    setDevLogs((prev) => [...prev, { msg, time: new Date().toLocaleTimeString() }]);
  };

  const playRewardSound = () => {
    const audio = new Audio(RewardGlitch);
    audio.volume = 0.9;
    audio.play().catch((err) => {
      console.warn('🔇 Reward sound failed:', err);
    });
  };

  useEffect(() => {
    const storedStreak = parseInt(localStorage.getItem(STREAK_KEY)) || 0;
    const lastDate = localStorage.getItem(LAST_DATE_KEY);
    const today = getToday();

    const aura = localStorage.getItem('novaZeroAura') === 'true';
    const domain = localStorage.getItem('novaZeroDomain') === 'true';
    setAuraUnlocked(aura);
    setDomainUnlocked(domain);

    if (lastDate !== today) {
      if (lastDate === getYesterday()) {
        localStorage.setItem(LAST_DATE_KEY, today);
      } else {
        localStorage.setItem(STREAK_KEY, '0');
        setStreak(0);
        const missed = parseInt(localStorage.getItem('novaZeroMissed')) || 0;
        const newMissed = missed + 1;
        setMissedStreak(newMissed);
        localStorage.setItem('novaZeroMissed', newMissed.toString());
        logDev(`❌ Missed streak increased to ${newMissed}`);
        return;
      }
    } else {
      localStorage.setItem('novaZeroMissed', '0');
      setMissedStreak(0);
    }

    setStreak(storedStreak);
    setIsTodayDone(lastDate === today);

    if (!aura && storedStreak >= 30) {
      localStorage.setItem('novaZeroAura', 'true');
      setAuraUnlocked(true);
      logDev('✨ Aura Unlocked');
    }

    if (!domain && storedStreak >= 60) {
      localStorage.setItem('novaZeroDomain', 'true');
      setDomainUnlocked(true);
      logDev('🌌 Domain Expansion Unlocked');
    }

    if (!rewardTriggered.current) {
      if (storedStreak === 7) {
        setRewardMessage('🎉 7-Day Streak! You chose strength.');
        triggerReward('🎉 Reward: 7 Days');
      } else if (storedStreak === 14) {
        setRewardMessage('💫 14-Day Streak! Consistency is power.');
        triggerReward('🎉 Reward: 14 Days');
      } else if (storedStreak === 30) {
        setRewardMessage('🌌 30-Day Streak! You’ve become the honored one.');
        triggerReward('🎉 Reward: 30 Days');
      } else if (storedStreak === 60) {
        setRewardMessage('🌀 60-Day Streak! Domain Eternal.');
        triggerReward('🎉 Reward: 60 Days');
      }
    }
  }, []);

  const triggerReward = (logText) => {
    setShowReward(true);
    rewardTriggered.current = true;
    logDev(logText);
    playRewardSound();
  };

  useEffect(() => {
    if (showReward) {
      const timeout = setTimeout(() => setShowReward(false), 6000);
      return () => clearTimeout(timeout);
    }
  }, [showReward]);

  useEffect(() => {
    const audio = new Audio(GojoVoice);
    const lastDate = localStorage.getItem(LAST_DATE_KEY);
    const today = getToday();

    if (lastDate !== today && lastDate !== getYesterday()) {
      audio.volume = 0.9;
      audio.play().catch((err) => {
        console.warn('Gojo voice failed:', err);
      });
    }
  }, []);

  const markDone = () => {
    const today = getToday();
    const newStreak = streak + 1;
    localStorage.setItem(LAST_DATE_KEY, today);
    localStorage.setItem(STREAK_KEY, newStreak);
    setStreak(newStreak);
    setIsTodayDone(true);
    localStorage.setItem('novaZeroMissed', '0');
    setMissedStreak(0);

    const oldHistory = JSON.parse(localStorage.getItem(STREAK_LOG_KEY)) || [];
    const todayLog = { date: today, done: true };
    localStorage.setItem(STREAK_LOG_KEY, JSON.stringify([...oldHistory, todayLog]));

    logDev(`✅ Streak updated to ${newStreak}`);
  };

  const resetStreak = () => {
    localStorage.clear();
    logDev('🔁 Streak reset. Local storage cleared.');
    window.location.reload();
  };

  const simulateStreak = (days) => {
    const today = getToday();
    localStorage.setItem(STREAK_KEY, days.toString());
    localStorage.setItem(LAST_DATE_KEY, today);
    logDev(`🧪 Simulated ${days}-day streak.`);
    window.location.reload();
  };

  return (
    <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-blackBg to-cursedBlue/30 shadow-xl text-whiteText text-center max-w-lg mx-auto my-6 border border-cursedBlue/40">
      <h2 className="text-2xl font-bold text-cursedBlue mb-3">🔥 Your Streak</h2>

      <div className="relative z-10 h-32 flex justify-center items-center mb-3">
        {isTodayDone ? (
          <Lottie animationData={BlueFlame} loop className="w-28 h-28" />
        ) : (
          <div className="text-5xl animate-rewind">🪵</div>
        )}
      </div>

      <div className="text-cursedGreen font-semibold text-lg mb-1 relative z-10">
        {streak} day streak
      </div>

      {missedStreak > 0 && (
        <div className="text-cursedRed text-xs mt-1 animate-fade">
          ❌ Missed {missedStreak} {missedStreak === 1 ? 'day' : 'days'} in a row
        </div>
      )}

      {domainUnlocked && (
        <div className="text-cursedBlue text-xs mt-1 tracking-wider uppercase font-bold animate-pulse">
          🧿 The Honored One
        </div>
      )}

      {auraUnlocked && !domainUnlocked && (
        <div className="text-yellow-400 text-xs mt-1 tracking-wider uppercase font-bold animate-pulse">
          ✨ Aura Unlocked
        </div>
      )}

      <p className="text-sm italic text-cursedRed mb-3 relative z-10">
        {isTodayDone ? 'Gojo: You didn’t disappoint me today.' : 'Gojo: Nah… I’d win 😏'}
      </p>

      {!isTodayDone && (
        <button
          onClick={markDone}
          className="relative z-10 bg-cursedPurple hover:bg-cursedRed text-whiteText px-5 py-2 rounded-full transition-all duration-300 mb-2"
        >
          ✅ I’ve completed my tasks
        </button>
      )}

      <div className="relative z-10 flex justify-center gap-3 mt-4 text-sm">
        <button
          onClick={resetStreak}
          className="px-4 py-1 bg-cursedRed hover:bg-red-700 text-whiteText rounded-md"
        >
          🔁 Reset
        </button>
        <button
          onClick={() => simulateStreak(7)}
          className="px-4 py-1 bg-cursedGreen hover:bg-green-700 text-black rounded-md"
        >
          🎯 Simulate 7d
        </button>
        <button
          onClick={() => simulateStreak(30)}
          className="px-4 py-1 bg-cursedBlue hover:bg-blue-700 text-whiteText rounded-md"
        >
          🌌 Simulate 30d
        </button>
        <button
          onClick={() => simulateStreak(60)}
          className="px-4 py-1 bg-purple-700 hover:bg-purple-900 text-whiteText rounded-md"
        >
          🌀 Simulate 60d
        </button>
      </div>

      <div className="mt-4 flex justify-center relative z-10">
        <button
          onClick={() => setShowLogs((prev) => !prev)}
          className="px-4 py-1 bg-blackBg border border-cursedGreen text-cursedGreen rounded-full text-xs"
        >
          {showLogs ? '🔽 Hide Dev Logs' : '🧪 Show Dev Logs'}
        </button>
      </div>

      {showLogs && (
        <div className="fixed top-0 right-0 w-80 h-full bg-blackBg border-l border-cursedBlue z-50 overflow-y-auto shadow-2xl p-4 text-xs text-whiteText font-mono space-y-2">
          <h4 className="font-bold text-cursedGreen mb-2">🧠 NovaZero Dev Logs</h4>
          {devLogs.length === 0 ? (
            <p className="text-gray-400">No logs yet.</p>
          ) : (
            devLogs.map((log, i) => (
              <div key={i} className="border-b border-white/10 pb-1">
                <span className="text-cursedPurple">{log.time}:</span> {log.msg}
              </div>
            ))
          )}
        </div>
      )}

      {showReward && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-blackBg/80 backdrop-blur">
          <div className="bg-cursedGreen text-black px-6 py-4 rounded-2xl shadow-2xl text-center animate-pulse border-4 border-cursedBlue max-w-xs">
            <h3 className="text-xl font-bold mb-2">🎁 Streak Reward</h3>
            <p className="text-sm">{rewardMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default StreakWidget;
