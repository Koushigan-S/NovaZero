import React, { useEffect, useState } from "react";

function ProfileTab() {
  const [bmi, setBmi] = useState("");
  const [goal, setGoal] = useState("gain");
  const [sport, setSport] = useState("badminton");
  const [dietType, setDietType] = useState("vegetarian");

  useEffect(() => {
    // Load saved profile if exists
    setBmi(localStorage.getItem("novaBMI") || "");
    setGoal(localStorage.getItem("novaGoal") || "gain");
    setSport(localStorage.getItem("novaSport") || "badminton");
    setDietType(localStorage.getItem("novaDietType") || "vegetarian");
  }, []);

  const saveProfile = () => {
    localStorage.setItem("novaBMI", bmi);
    localStorage.setItem("novaGoal", goal);
    localStorage.setItem("novaSport", sport);
    localStorage.setItem("novaDietType", dietType);
    alert("✅ Profile saved successfully!");
  };

  return (
    <div className="text-whiteText max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-cursedBlue">🧠 Your Profile</h2>

      <label className="block mb-2 text-sm">BMI:</label>
      <input
        type="number"
        value={bmi}
        onChange={(e) => setBmi(e.target.value)}
        className="w-full p-2 rounded bg-blackBg border border-cursedPurple text-white mb-4"
      />

      <label className="block mb-2 text-sm">Goal:</label>
      <select
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full p-2 rounded bg-blackBg border border-cursedPurple text-white mb-4"
      >
        <option value="gain">Gain</option>
        <option value="maintain">Maintain</option>
        <option value="cut">Cut</option>
      </select>

      <label className="block mb-2 text-sm">Sport:</label>
      <select
        value={sport}
        onChange={(e) => setSport(e.target.value)}
        className="w-full p-2 rounded bg-blackBg border border-cursedPurple text-white mb-4"
      >
        <option value="badminton">Badminton</option>
        <option value="boxing">Boxing</option>
        <option value="general">General Fitness</option>
      </select>

      <label className="block mb-2 text-sm">Diet Type:</label>
      <select
        value={dietType}
        onChange={(e) => setDietType(e.target.value)}
        className="w-full p-2 rounded bg-blackBg border border-cursedPurple text-white mb-6"
      >
        <option value="vegetarian">Vegetarian</option>
        <option value="eggetarian">Eggetarian</option>
        <option value="vegan">Vegan</option>
      </select>

      <button
        onClick={saveProfile}
        className="w-full py-2 bg-cursedGreen text-black font-bold rounded hover:bg-green-500 transition"
      >
        💾 Save Profile
      </button>
    </div>
  );
}

export default ProfileTab;
