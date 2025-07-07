import React, { useEffect, useState } from "react";

// 🧠 Smart meal generator based on user profile
function generateMeals({ bmi, goal, sport, type }) {
  const base = [];

  if (type === "vegetarian") {
    if (goal === "gain") {
      base.push("🥣 Oats + peanut butter + banana + milk");
      base.push("🍛 Paneer + dal + curd rice lunch");
      base.push("🍌 Pre-training banana or dates");
      base.push("🥤 Evening shake or buttermilk");
      base.push("🍲 Chapati + dal + salad dinner");
      base.push("💧 Drink 2.5–3L water");
    } else if (goal === "maintain") {
      base.push("🍞 Brown bread + fruit");
      base.push("🥗 Light veg lunch + salad");
      base.push("🍵 Green tea + snack");
      base.push("🍲 Khichdi dinner");
      base.push("💧 Drink 2L water");
    }
  }

  if (sport === "badminton") {
    base.push("🏸 Pre-session fuel (banana, nuts, yogurt)");
    base.push("🧃 Post-match drink (ORS / lemon water)");
    base.push("💧 Hydration check: 3L target");
  }

  if (bmi < 18) {
    base.push("🍫 High-calorie snack: protein bar / chikki");
    base.push("🥜 Add peanut or sesame daily");
  }

  return base.slice(0, 8); // max 8 meals
}

function DietTab() {
  const today = new Date().toDateString();
  const [completed, setCompleted] = useState([]);
  const [generatedMeals, setGeneratedMeals] = useState([]);

  useEffect(() => {
    const bmi = parseFloat(localStorage.getItem("novaBMI")) || 18.5;
    const goal = localStorage.getItem("novaGoal") || "maintain";
    const sport = localStorage.getItem("novaSport") || "general";
    const type = localStorage.getItem("novaDietType") || "vegetarian";

    const generated = generateMeals({ bmi, goal, sport, type });
    setGeneratedMeals(generated);

    const saved = JSON.parse(localStorage.getItem("novaZeroDiet")) || {};
    setCompleted(saved[today] || []);
  }, [today]);

  useEffect(() => {
    const all = JSON.parse(localStorage.getItem("novaZeroDiet")) || {};
    all[today] = completed;
    localStorage.setItem("novaZeroDiet", JSON.stringify(all));
  }, [completed, today]);

  const toggleMeal = (meal) => {
    setCompleted((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal]
    );
  };

  return (
    <div className="text-whiteText">
      <h2 className="text-2xl font-bold mb-3">🥗 Personalized Diet Plan</h2>
      <p className="text-cursedPurple mb-4">For: <strong>{today}</strong></p>

      <ul className="space-y-3">
        {generatedMeals.map((meal, i) => (
          <li key={i} className="flex items-center gap-2 bg-blackBg/30 px-4 py-2 rounded-lg border border-cursedBlue">
            <input
              type="checkbox"
              checked={completed.includes(meal)}
              onChange={() => toggleMeal(meal)}
            />
            <span>{meal}</span>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-cursedGreen text-sm">
        ✅ {completed.length} / {generatedMeals.length} followed today
      </p>
    </div>
  );
}

export default DietTab;
