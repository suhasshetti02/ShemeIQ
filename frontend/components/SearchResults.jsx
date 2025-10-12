"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function SearchResults({ results }) {
  const [selectedScheme, setSelectedScheme] = useState(null);

  const handleBack = () => setSelectedScheme(null);

  if (!results ) return <p>No results found.</p>;

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      {/* 🧩 Scheme List */}
      {!selectedScheme && results.length > 0 && (
        <div className="grid gap-4 mt-6">
          {results.map((scheme, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer bg-white dark:bg-white/5 transition dark:border-accent"
              onClick={() => setSelectedScheme(scheme)}
            >
              <h3 className="text-lg font-semibold dark:text-white">{scheme.scheme_name}</h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">{scheme.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* 📜 Detailed Scheme View */}
      {selectedScheme && (
        <div className="mt-6 p-6 border rounded-lg bg-white dark:bg-black shadow">
          <h3 className="text-xl font-bold mb-6 dark:text-accent">{selectedScheme.scheme_name}</h3>
          <p className="mb-4">
            <strong className="dark:text-accent">Eligibility:</strong> {selectedScheme.eligibility}
          </p>
          <p className="mb-4">
            <strong className="dark:text-accent">Department:</strong> {selectedScheme.schemeCategory}
          </p>
          <p className="mb-4">
            <strong className="dark:text-accent">Tags:</strong> {selectedScheme.tags}
          </p>

          <Button onClick={handleBack} variant="outline" className="mt-4">
            ← Back
          </Button>
        </div>
      )}
    </section>
  );
}
