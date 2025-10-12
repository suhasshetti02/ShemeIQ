"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import api from "./lib/app"; // Your axios instance

export default function Recommend() {
  const [userProfile, setUserProfile] = useState({
    age: "",
    gender: "",
    state: "",
    occupation: "",
    income: "",
    caste: "",
    others: ""
  });

  const [loading, setLoading] = useState(false);
  const [recommendedSchemes, setRecommendedSchemes] = useState([]);
  const [selectedScheme, setSelectedScheme] = useState(null);
  const [error, setError] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit user profile to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/recommend", userProfile);
      setRecommendedSchemes(res.data); // backend returns array of schemes
    } catch (err) {
      setError("Failed to fetch recommendations.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Go back to scheme list
  const handleBack = () => {
    setSelectedScheme(null);
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-bold text-primary dark:text-white mb-4">
        Recommend Schemes
      </h2>

      {/* 🧾 Input Form */}
      {!recommendedSchemes.length && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={userProfile.age || ""}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded dark:bg-black"
          />

          <select
            name="gender"
            value={userProfile.gender}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded dark:bg-black"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input
            type="text"
            name="state"
            placeholder="State"
            value={userProfile.state}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded dark:bg-black"
          />

          <input
            type="text"
            name="occupation"
            placeholder="Occupation"
            value={userProfile.occupation}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded dark:bg-black"
          />

          <input
            type="number"
            name="income"
            placeholder="Annual Income"
            value={userProfile.income || ""}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded dark:bg-black"
          />

          <input
            type="text"
            name="caste"
            placeholder="Caste"
            value={userProfile.caste}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded dark:bg-black"
          />

          <input
            type="text"
            name="others"
            placeholder="Other Information (optional)"
            value={userProfile.others}
            onChange={handleInputChange}
            className="w-full p-3 border rounded dark:bg-black"
          />

          <Button type="submit" disabled={loading}>
            {loading ? "Finding Schemes..." : "Submit"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
        </form>
      )}

      {/* 🧩 Scheme List */}
      {!selectedScheme && recommendedSchemes.length > 0 && (
        <div className="grid gap-4 mt-6">
          {recommendedSchemes.map((scheme, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer bg-white dark:bg-white/5 transition dark:border-accent"
              onClick={() => setSelectedScheme(scheme)}
            >
              <h3 className="text-lg font-semibold dark:text-white">
                {scheme.scheme_name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {scheme.description}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* 📜 Detailed Scheme View */}
      {selectedScheme && (
        <div className="mt-6  p-6 border rounded-lg bg-white dark:bg-black shadow">
          <h3 className="text-xl font-bold mb-6 dark:text-accent">{selectedScheme.scheme_name}</h3>
          <p className="mb-4">
            <strong className="dark:text-accent">Eligibility:</strong> {selectedScheme.eligibility}
          </p>
          <p className="mb-4">
            <strong className="dark:text-accent">Department:</strong> {selectedScheme.schemeCategory}
          </p>
          <p className="mb-4">
            <strong className="dark:text-accent">tags:</strong> {selectedScheme.tags}
          </p>
          

          <Button onClick={handleBack} variant="outline" className="mt-4">
            ← Back
          </Button>
        </div>
      )}
    </section>
  );
}
