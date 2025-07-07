import React, { useEffect, useState } from "react";

const UnlockablesTab = () => {
  const [streak, setStreak] = useState(0);
  const [aura, setAura] = useState(false);
  const [domain, setDomain] = useState(false);
  const [justUnlocked, setJustUnlocked] = useState(null);

  const rewardAudio = new Audio("/reward-glitch.mp3");
  rewardAudio.volume = 0.85;

  const rewards = [
    {
      title: "✨ Aura Unlocked",
      description: "Achieve a 30-day streak",
      key: "novaZeroAura",
    },
    {
      title: "🌌 Domain Expansion",
      description: "Achieve a 60-day streak",
      key: "novaZeroDomain",
    },
    {
      title: "🧠 Quote Archive",
      description: "Unlocked with 60-day streak",
      key: "novaQuoteVault",
    },
    {
      title: "🎴 Badge: Cursed Champion",
      description: "Unlocked after 14-day streak",
      key: "novaBadge14",
    },
    {
      title: "🎯 Badge: Consistency Core",
      description: "Unlocked after 7-day streak",
      key: "novaBadge7",
    },
  ];

  useEffect(() => {
    const currentStreak = parseInt(localStorage.getItem("novaZeroStreak")) || 0;
    setStreak(currentStreak);

    if (currentStreak >= 30 && !localStorage.getItem("novaZeroAura")) {
      localStorage.setItem("novaZeroAura", "true");
      setJustUnlocked("✨ Aura Unlocked");
      rewardAudio.play();
    }
    if (currentStreak >= 60 && !localStorage.getItem("novaZeroDomain")) {
      localStorage.setItem("novaZeroDomain", "true");
      setJustUnlocked("🌌 Domain Expansion");
      rewardAudio.play();
    }
    if (currentStreak >= 60 && !localStorage.getItem("novaQuoteVault")) {
      localStorage.setItem("novaQuoteVault", "true");
      setJustUnlocked("🧠 Quote Archive");
      rewardAudio.play();
    }
    if (currentStreak >= 14 && !localStorage.getItem("novaBadge14")) {
      localStorage.setItem("novaBadge14", "true");
      setJustUnlocked("🎴 Badge: Cursed Champion");
      rewardAudio.play();
    }
    if (currentStreak >= 7 && !localStorage.getItem("novaBadge7")) {
      localStorage.setItem("novaBadge7", "true");
      setJustUnlocked("🎯 Badge: Consistency Core");
      rewardAudio.play();
    }

    setAura(localStorage.getItem("novaZeroAura") === "true");
    setDomain(localStorage.getItem("novaZeroDomain") === "true");
  }, []);

  return (
    <div className="text-whiteText max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-cursedBlue mb-4">🔓 Unlockables Dashboard</h2>
      <p className="text-sm text-whiteText/60 mb-4">
        Track your habit milestones and special powers unlocked through streak progress.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {rewards.map((r, i) => {
          const unlocked = localStorage.getItem(r.key) === "true";
          return (
            <div
              key={i}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                unlocked
                  ? "border-cursedGreen bg-cursedGreen/10 shadow-md"
                  : "border-whiteText/10 bg-blackBg/30"
              }`}
            >
              <h3 className={`text-lg font-semibold ${unlocked ? "text-cursedGreen" : "text-whiteText/50"}`}>
                {r.title}
              </h3>
              <p className="text-sm">{r.description}</p>
              <p className="text-xs mt-1 italic">
                {unlocked ? "✅ Unlocked" : "🔒 Locked"}
              </p>
            </div>
          );
        })}
      </div>

      {justUnlocked && (
        <div className="mt-6 p-4 bg-blackBg border border-cursedBlue text-cursedGreen text-center rounded-xl shadow-xl animate-pulse">
          <h3 className="text-lg font-bold">🎉 Unlocked:</h3>
          <p className="mt-1">{justUnlocked}</p>
        </div>
      )}

      {domain && (
        <div className="mt-8 text-center text-cursedBlue text-sm animate-fade-in">
          🌀 You’ve achieved <span className="font-bold">Domain Expansion</span> — Your streak now shapes your world.
        </div>
      )}
    </div>
  );
};

export default UnlockablesTab;
