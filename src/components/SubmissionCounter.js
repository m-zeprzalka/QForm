"use client";

import { useState, useEffect } from "react";

export default function SubmissionCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch("/api/count");

        if (!response.ok) {
          throw new Error("Nie udało się pobrać liczby zgłoszeń");
        }

        const data = await response.json();
        setCount(data.count);
        setLoading(false);
      } catch (error) {
        console.error("Błąd:", error);
        setLoading(false);
      }
    }

    fetchCount();

    // Odświeżanie licznika co minutę
    const interval = setInterval(fetchCount, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-center">
      <h3 className="text-lg font-medium text-blue-800 mb-1">
        Liczba zgłoszeń
      </h3>

      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-blue-200 rounded w-16 mx-auto"></div>
        </div>
      ) : (
        <div className="text-3xl font-bold text-blue-600">{count}</div>
      )}

      <p className="text-sm text-blue-500 mt-1">Dołącz do projektu!</p>
    </div>
  );
}
