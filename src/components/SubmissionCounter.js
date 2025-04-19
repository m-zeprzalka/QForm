"use client";

import { useState, useEffect } from "react";
import { MoveRight } from "lucide-react";

export default function SubmissionCounter() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [remainingFree, setRemainingFree] = useState(300);

  useEffect(() => {
    async function fetchCount() {
      try {
        const response = await fetch("/api/count");

        if (!response.ok) {
          throw new Error("Nie udało się pobrać liczby zgłoszeń");
        }

        const data = await response.json();
        setCount(data.count);

        // Obliczanie pozostałych darmowych raportów
        const usedFree = Math.min(data.count, 300);
        setRemainingFree(300 - usedFree);

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
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-blue-600 rounded-xl p-6 text-white shadow-md flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2">Dołącz do projektu</h3>
          <p className="mb-4 text-blue-100">
            Twoje dane pomogą innym osobom w podobnej sytuacji, a także
            przyczynią się do większej transparentności procesu ustalania
            alimentów w Polsce.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">Zgłoszeń w bazie:</p>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-8 bg-blue-500 rounded w-16"></div>
              </div>
            ) : (
              <div className="text-3xl font-bold">{count}</div>
            )}
          </div>
          <button
            onClick={() =>
              document
                .getElementById("alimatrix-form")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="bg-white text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg flex items-center transition-colors"
          >
            Wypełnij formularz
            <MoveRight size={18} className="ml-1" />
          </button>
        </div>
      </div>

      <div className="bg-green-50 rounded-xl p-6 border border-green-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Bezpłatne raporty
        </h3>
        <p className="text-gray-600 mb-4">
          Dostęp do raportów jest odpłatny, ale dla{" "}
          <strong>pierwszych 300 osób</strong>, personalizowany raport otrzymasz{" "}
          <strong>za darmo</strong>.
        </p>

        <div className="bg-white p-4 rounded-lg border border-gray-100">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">
                  Pozostało bezpłatnych raportów
                </span>
                <span className="text-sm font-medium text-green-600">
                  {Math.max(0, remainingFree)} / 300
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-green-600 h-2.5 rounded-full"
                  style={{ width: `${Math.max(0, remainingFree / 3)}%` }}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
