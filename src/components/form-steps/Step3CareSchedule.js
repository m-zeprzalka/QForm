"use client";

import { useState } from "react";
import { AlertCircle, Info } from "lucide-react";
import CareScheduleTable from "@/components/CareScheduleTable";

const CycleTypeOptions = [
  { id: "weekly", label: "Co tydzień" },
  { id: "biweekly", label: "Co 2 tygodnie" },
  { id: "monthly", label: "Co 4 tygodnie" },
  { id: "no_pattern", label: "Brak stałego schematu" },
];

const Step3CareSchedule = ({ formData, updateFormData, errors }) => {
  const [activeChildIndex, setActiveChildIndex] = useState(0);
  const [activeCycleType, setActiveCycleType] = useState("weekly");
  const [activeWeek, setActiveWeek] = useState(1);

  // Funkcja sprawdzająca, czy dziecko ma niestandardowy harmonogram opieki
  const hasCustomCareSchedule = (childIndex) => {
    return formData.children[childIndex]?.careType === "custom";
  };

  // Pobranie aktualnie wybranego dziecka
  const selectedChild = formData.children[activeChildIndex] || {};

  // Pobranie cyklu opieki dla aktualnie wybranego dziecka
  const handleCycleTypeChange = (e) => {
    const newCycleType = e.target.value;
    setActiveCycleType(newCycleType);

    // Aktualizacja cyklu opieki w danych formularza
    const updatedChildren = [...formData.children];
    updatedChildren[activeChildIndex].careSchedules =
      updatedChildren[activeChildIndex].careSchedules || [];

    // Aktualizacja typu cyklu dla wszystkich harmonogramów dziecka
    updatedChildren[activeChildIndex].careSchedules = updatedChildren[
      activeChildIndex
    ].careSchedules.map((schedule) => ({
      ...schedule,
      cycleType: newCycleType,
    }));

    updateFormData({
      children: updatedChildren,
    });

    // Resetowanie aktywnego tygodnia do pierwszego
    setActiveWeek(1);
  };

  // Obsługa zmiany aktywnego tygodnia
  const handleWeekChange = (weekNumber) => {
    setActiveWeek(weekNumber);
  };

  // Obsługa aktualizacji danych harmonogramu dla dziecka
  const handleScheduleUpdate = (childIndex, scheduleData) => {
    if (!formData.children[childIndex]) return;

    const updatedChildren = [...formData.children];

    // Inicjalizacja tablicy harmonogramów, jeśli nie istnieje
    if (!updatedChildren[childIndex].careSchedules) {
      updatedChildren[childIndex].careSchedules = [];
    }

    // Aktualizacja lub dodanie nowych wpisów harmonogramu
    scheduleData.forEach((daySchedule) => {
      const scheduleIndex = updatedChildren[childIndex].careSchedules.findIndex(
        (s) =>
          s.dayOfWeek === daySchedule.dayOfWeek &&
          s.weekNumber === daySchedule.weekNumber
      );

      if (scheduleIndex >= 0) {
        // Aktualizacja istniejącego wpisu
        updatedChildren[childIndex].careSchedules[scheduleIndex] = {
          ...updatedChildren[childIndex].careSchedules[scheduleIndex],
          ...daySchedule,
        };
      } else {
        // Dodanie nowego wpisu
        updatedChildren[childIndex].careSchedules.push({
          ...daySchedule,
          cycleType: activeCycleType,
        });
      }
    });

    updateFormData({
      children: updatedChildren,
    });
  };

  // Renderowanie zakładek dla dzieci
  const renderChildTabs = () => {
    return (
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          {formData.children.map((child, index) => (
            <button
              key={index}
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                index === activeChildIndex
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
              onClick={() => setActiveChildIndex(index)}
            >
              Dziecko {index + 1} {child.age ? `(${child.age} lat)` : ""}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Renderowanie zakładek dla tygodni
  const renderWeekTabs = () => {
    // Określenie liczby tygodni na podstawie typu cyklu
    let weekCount = 1;
    if (activeCycleType === "biweekly") weekCount = 2;
    if (activeCycleType === "monthly" || activeCycleType === "no_pattern")
      weekCount = 4;

    const weeks = Array.from({ length: weekCount }, (_, i) => i + 1);

    return (
      <div className="mb-6 border-b border-gray-200">
        <div className="flex space-x-2 overflow-x-auto">
          {weeks.map((week) => (
            <button
              key={week}
              type="button"
              className={`px-4 py-2 text-sm font-medium ${
                week === activeWeek
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-800 hover:border-gray-300"
              }`}
              onClick={() => handleWeekChange(week)}
            >
              Tydzień {week}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Harmonogram opieki nad dzieckiem
        </h2>
        <p className="text-gray-600">
          W tej sekcji zbieramy informacje o opiece nad dzieckiem i czasie, jaki
          spędzasz z nim w danym okresie. Aby obliczenia były precyzyjne,
          prosimy o wpisanie czasu spędzanego z dzieckiem w poszczególnych
          dniach.
        </p>
      </div>

      {/* Zakładki dla dzieci */}
      {renderChildTabs()}

      {/* Sprawdzenie czy dziecko ma niestandardowy harmonogram opieki */}
      {hasCustomCareSchedule(activeChildIndex) ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Okres powtarzania się cyklu opieki
            </label>
            <select
              value={activeCycleType}
              onChange={handleCycleTypeChange}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {CycleTypeOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            {activeCycleType === "no_pattern" && (
              <div className="mt-2 p-3 bg-yellow-50 border border-yellow-100 rounded-md flex items-start">
                <Info
                  size={16}
                  className="text-yellow-600 mr-2 mt-0.5 flex-shrink-0"
                />
                <p className="text-sm text-yellow-700">
                  Dla braku stałego schematu, podaj uśrednione dane dla
                  przykładowych 4 tygodni, aby ustandaryzować analizę.
                </p>
              </div>
            )}
          </div>

          {/* Zakładki dla tygodni w przypadku cykli wielotygodniowych */}
          {activeCycleType !== "weekly" && renderWeekTabs()}

          {/* Tabela harmonogramu opieki */}
          <CareScheduleTable
            childIndex={activeChildIndex}
            weekNumber={activeWeek}
            cycleType={activeCycleType}
            careSchedules={selectedChild.careSchedules || []}
            onChange={handleScheduleUpdate}
            errors={errors}
          />
        </div>
      ) : (
        <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 text-center">
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Opieka naprzemienna (50/50)
          </h3>
          <p className="text-gray-600 mb-4">
            Dla tego dziecka wybrano opiekę naprzemienną, gdzie czas jest
            dzielony równo pomiędzy oboje rodziców. Nie ma potrzeby wypełniania
            szczegółowego harmonogramu.
          </p>
          <p className="text-sm text-gray-500">
            Jeśli chcesz wprowadzić niestandardowy harmonogram, wróć do
            poprzedniego kroku i zmień sposób sprawowania pieczy na "Inna".
          </p>
        </div>
      )}

      {errors[`children[${activeChildIndex}].careSchedules`] && (
        <p className="mt-1 text-sm text-red-600 flex items-start">
          <AlertCircle size={16} className="mr-1 mt-0.5 flex-shrink-0" />
          {errors[`children[${activeChildIndex}].careSchedules`]}
        </p>
      )}
    </div>
  );
};

export default Step3CareSchedule;
