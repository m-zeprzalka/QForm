"use client";

import { useState, useEffect } from "react";
import { Clock, AlertCircle, InfoIcon } from "lucide-react";

const DAYS_OF_WEEK = [
  { id: "monday", label: "Poniedziałek" },
  { id: "tuesday", label: "Wtorek" },
  { id: "wednesday", label: "Środa" },
  { id: "thursday", label: "Czwartek" },
  { id: "friday", label: "Piątek" },
  { id: "saturday", label: "Sobota" },
  { id: "sunday", label: "Niedziela" },
];

const TIME_SLOTS = [
  { id: "morningHours", label: "Poranek", available: true },
  { id: "educationalHours", label: "Placówka edukacyjna", available: true },
  { id: "afternoonHours", label: "Czas po placówce", available: true },
  { id: "sleepAtUser", label: "Sen u Ciebie", available: true },
  {
    id: "sleepAtOtherParent",
    label: "Sen u drugiego rodzica",
    available: true,
  },
];

// Funkcja do obliczania godzin
const calculateHours = (timeRange) => {
  if (!timeRange || timeRange.trim() === "") return 0;

  try {
    const parts = timeRange.split("-");
    if (parts.length !== 2) return 0;

    let start = parseInt(parts[0], 10);
    let end = parseInt(parts[1], 10);

    // Obsługa godzin nocnych
    if (end < start) {
      return 24 - start + end;
    }

    return end - start;
  } catch (error) {
    console.error("Błąd w obliczaniu godzin:", error);
    return 0;
  }
};

const CareScheduleTable = ({
  childIndex,
  weekNumber = 1,
  cycleType,
  careSchedules = [],
  onChange,
  errors = {},
}) => {
  // Stan przechowujący dane harmonogramu dla aktualnego tygodnia
  const [scheduleData, setScheduleData] = useState({});
  // Stan do śledzenia sumarycznych godzin
  const [hourSummary, setHourSummary] = useState({
    user: 0,
    otherParent: 0,
    school: 0,
    total: 24 * 7, // Łączna liczba godzin w tygodniu
  });

  // Inicjalizacja lub aktualizacja danych harmonogramu
  useEffect(() => {
    const weekSchedule = {};

    // Inicjalizacja pustego harmonogramu dla każdego dnia tygodnia
    DAYS_OF_WEEK.forEach((day) => {
      const existingSchedule = careSchedules.find(
        (s) => s.dayOfWeek === day.id && s.weekNumber === weekNumber
      );

      if (existingSchedule) {
        weekSchedule[day.id] = { ...existingSchedule };
      } else {
        weekSchedule[day.id] = {
          dayOfWeek: day.id,
          weekNumber,
          cycleType,
          morningHours: "",
          educationalHours: "",
          afternoonHours: "",
          sleepAtUser: "",
          sleepAtOtherParent: "",
          hoursWithUser: 0,
          hoursWithOtherParent: 0,
          hoursAtSchool: 0,
        };
      }
    });

    setScheduleData(weekSchedule);
  }, [weekNumber, cycleType, careSchedules]);

  // Obliczanie sumy godzin, gdy zmienią się dane harmonogramu
  useEffect(() => {
    let userHours = 0;
    let otherParentHours = 0;
    let schoolHours = 0;

    Object.values(scheduleData).forEach((daySchedule) => {
      userHours += calculateHours(daySchedule.morningHours || "");
      userHours += calculateHours(daySchedule.afternoonHours || "");
      userHours += calculateHours(daySchedule.sleepAtUser || "");

      otherParentHours += calculateHours(daySchedule.sleepAtOtherParent || "");

      schoolHours += calculateHours(daySchedule.educationalHours || "");
    });

    // Obliczanie pozostałych godzin dla drugiego rodzica
    const totalAccountedHours = userHours + otherParentHours + schoolHours;
    const remainingHours = Math.max(0, 24 * 7 - totalAccountedHours);
    otherParentHours += remainingHours;

    setHourSummary({
      user: userHours,
      otherParent: otherParentHours,
      school: schoolHours,
      total: 24 * 7,
    });
  }, [scheduleData]);

  // Obsługa zmiany wartości w tabeli
  const handleTimeChange = (dayId, fieldId, value) => {
    // Zmodyfikowana walidacja formatu czasu - pozwala na wprowadzanie częściowych wartości
    if (value && value !== "-" && !/^(\d{1,2})?(-)?(\d{1,2})?$/.test(value)) {
      return; // Ignoruj tylko całkowicie nieprawidłowy format
    }

    const updatedSchedule = {
      ...scheduleData,
      [dayId]: {
        ...scheduleData[dayId],
        [fieldId]: value,
      },
    };

    // Obliczanie godzin dla danego dnia
    const daySchedule = updatedSchedule[dayId];
    const morningHours = calculateHours(daySchedule.morningHours || "");
    const educationalHours = calculateHours(daySchedule.educationalHours || "");
    const afternoonHours = calculateHours(daySchedule.afternoonHours || "");
    const sleepAtUser = calculateHours(daySchedule.sleepAtUser || "");
    const sleepAtOtherParent = calculateHours(
      daySchedule.sleepAtOtherParent || ""
    );

    // Aktualizacja liczby godzin
    updatedSchedule[dayId].hoursWithUser =
      morningHours + afternoonHours + sleepAtUser;
    updatedSchedule[dayId].hoursWithOtherParent = sleepAtOtherParent;
    updatedSchedule[dayId].hoursAtSchool = educationalHours;

    setScheduleData(updatedSchedule);

    // Powiadomienie rodzica o zmianie
    if (onChange) {
      const scheduleArray = Object.values(updatedSchedule);
      onChange(childIndex, scheduleArray);
    }
  };

  // Renderowanie wskazówek
  const renderHelpText = () => (
    <div className="mb-6 bg-blue-50 p-4 rounded-lg border border-blue-100">
      <h3 className="font-semibold text-gray-800 mb-2 flex items-center">
        <InfoIcon size={18} className="text-blue-500 mr-2" />
        Jak wypełnić tabelę opieki?
      </h3>
      <ul className="text-sm text-gray-600 space-y-2">
        <li>
          • Wpisuj godziny w formacie <strong>OD-DO</strong>, np.{" "}
          <code>8-14</code> (od 8:00 do 14:00)
        </li>
        <li>
          • Wpisuj tylko czas, gdy dziecko jest pod Twoją opieką lub w placówce
          edukacyjnej
        </li>
        <li>
          • Pamiętaj, że noc przypisujemy do dnia, w którym dziecko zasnęło
        </li>
        <li>
          • Dla godzin nocnych (np. 20:00 - 6:00), wpisz <code>20-6</code>
        </li>
        <li>
          • Pozostały czas zostanie automatycznie przypisany do drugiego rodzica
        </li>
      </ul>
    </div>
  );

  // Renderowanie podsumowania godzin
  const renderSummary = () => {
    const userPercent = Math.round(
      (hourSummary.user / hourSummary.total) * 100
    );
    const otherParentPercent = Math.round(
      (hourSummary.otherParent / hourSummary.total) * 100
    );
    const schoolPercent = Math.round(
      (hourSummary.school / hourSummary.total) * 100
    );

    return (
      <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-3">
          Podsumowanie czasu (tydzień {weekNumber})
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-3">
          <div className="bg-blue-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Czas z Tobą</p>
            <p className="text-xl font-bold text-blue-700">{userPercent}%</p>
            <p className="text-xs text-gray-500">
              {hourSummary.user} godz. / tydzień
            </p>
          </div>

          <div className="bg-green-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Czas w placówce</p>
            <p className="text-xl font-bold text-green-700">{schoolPercent}%</p>
            <p className="text-xs text-gray-500">
              {hourSummary.school} godz. / tydzień
            </p>
          </div>

          <div className="bg-purple-100 p-3 rounded-lg text-center">
            <p className="text-sm text-gray-600">Czas z drugim rodzicem</p>
            <p className="text-xl font-bold text-purple-700">
              {otherParentPercent}%
            </p>
            <p className="text-xs text-gray-500">
              {hourSummary.otherParent} godz. / tydzień
            </p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
          <div className="flex h-full">
            <div
              className="bg-blue-600 h-full"
              style={{ width: `${userPercent}%` }}
              title={`Czas z Tobą: ${userPercent}%`}
            ></div>
            <div
              className="bg-green-600 h-full"
              style={{ width: `${schoolPercent}%` }}
              title={`Czas w placówce: ${schoolPercent}%`}
            ></div>
            <div
              className="bg-purple-600 h-full"
              style={{ width: `${otherParentPercent}%` }}
              title={`Czas z drugim rodzicem: ${otherParentPercent}%`}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  // Główny render komponentu
  return (
    <div className="mb-8">
      {renderHelpText()}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200 w-32">
                Dzień tygodnia
              </th>
              {TIME_SLOTS.map(
                (slot) =>
                  slot.available && (
                    <th
                      key={slot.id}
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                    >
                      {slot.label}
                    </th>
                  )
              )}
            </tr>
          </thead>

          <tbody>
            {DAYS_OF_WEEK.map((day) => (
              <tr key={day.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 text-sm font-medium text-gray-700 border-b border-gray-200">
                  {day.label}
                </td>

                {TIME_SLOTS.map((slot) => {
                  // Dezaktywuj pola placówki edukacyjnej dla weekendów
                  const isEducationalAndWeekend =
                    slot.id === "educationalHours" &&
                    (day.id === "saturday" || day.id === "sunday");

                  return (
                    slot.available && (
                      <td
                        key={`${day.id}-${slot.id}`}
                        className="px-4 py-3 text-sm text-gray-700 border-b border-gray-200"
                      >
                        {isEducationalAndWeekend ? (
                          <span className="text-gray-400">Brak zajęć</span>
                        ) : (
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Clock size={16} className="text-gray-400" />
                            </div>
                            <input
                              type="text"
                              placeholder="np. 8-14"
                              value={scheduleData[day.id]?.[slot.id] || ""}
                              onChange={(e) =>
                                handleTimeChange(
                                  day.id,
                                  slot.id,
                                  e.target.value
                                )
                              }
                              className="pl-9 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {errors[
                              `children[${childIndex}].careSchedules.${day.id}.${slot.id}`
                            ] && (
                              <p className="mt-1 text-xs text-red-600 flex items-center">
                                <AlertCircle size={12} className="mr-1" />
                                {
                                  errors[
                                    `children[${childIndex}].careSchedules.${day.id}.${slot.id}`
                                  ]
                                }
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                    )
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {renderSummary()}
    </div>
  );
};

export default CareScheduleTable;
