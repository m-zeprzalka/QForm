// src/components/form-steps/Step4Court.js
import { AlertCircle } from "lucide-react";

const COURT_LOCATIONS = [
  "Warszawa",
  "Kraków",
  "Łódź",
  "Wrocław",
  "Poznań",
  "Gdańsk",
  "Szczecin",
  "Bydgoszcz",
  "Lublin",
  "Białystok",
  // W pełnej wersji byłaby tu lista wszystkich 318 sądów rejonowych i 47 okręgowych
];

const Step4Court = ({ formData, handleChange, errors }) => {
  // Czy ten krok jest wymagany?
  const isCourtInfoRequired = ["court_order", "divorce_decree"].includes(
    formData.alimentBasis
  );

  if (!isCourtInfoRequired) {
    return (
      <div className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Informacje o postępowaniu sądowym
          </h2>
          <p className="text-gray-600">
            Ta sekcja nie jest wymagana, ponieważ wybrałeś/aś jako podstawę:
            {formData.alimentBasis === "parental_agreement"
              ? " Porozumienie rodzicielskie"
              : " Inne"}
            .
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            Kliknij "Dalej", aby przejść do następnego kroku.
          </p>
        </div>
      </div>
    );
  }

  // Funkcja bezpiecznego handleChange dla suwaka
  const handleSatisfactionChange = (e) => {
    const value = parseInt(e.target.value, 10);
    handleChange({
      target: {
        name: "judgeSatisfaction",
        value: value,
        type: "range",
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Informacje o postępowaniu sądowym
        </h2>
        <p className="text-gray-600">
          Podaj informacje o sądzie, który wydał postanowienie/wyrok w sprawie
          alimentów.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="courtDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Data wydania postanowienia/wyroku
          </label>
          <input
            type="date"
            id="courtDate"
            name="courtDate"
            value={formData.courtDate || ""}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.courtDate ? "border-red-500" : "border-gray-300"
            } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {errors.courtDate && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.courtDate}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="courtType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Rodzaj sądu
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="courtType-district"
                name="courtType"
                value="district"
                checked={formData.courtType === "district"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="courtType-district"
                className="ml-2 block text-sm text-gray-700"
              >
                Sąd Rejonowy
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="courtType-regional"
                name="courtType"
                value="regional"
                checked={formData.courtType === "regional"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="courtType-regional"
                className="ml-2 block text-sm text-gray-700"
              >
                Sąd Okręgowy
              </label>
            </div>
          </div>
          {errors.courtType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.courtType}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="courtLocation"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Miejscowość sądu
          </label>
          <select
            id="courtLocation"
            name="courtLocation"
            value={formData.courtLocation || ""}
            onChange={handleChange}
            className={`mt-1 block w-full py-2 px-3 border ${
              errors.courtLocation ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Wybierz miejscowość</option>
            {COURT_LOCATIONS.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
          {errors.courtLocation && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.courtLocation}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="judgeCount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Liczba sędziów w składzie
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="judgeCount-1"
                name="judgeCount"
                value="1"
                checked={
                  formData.judgeCount === 1 || formData.judgeCount === "1"
                }
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="judgeCount-1"
                className="ml-2 block text-sm text-gray-700"
              >
                1 sędzia
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="judgeCount-3"
                name="judgeCount"
                value="3"
                checked={
                  formData.judgeCount === 3 || formData.judgeCount === "3"
                }
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="judgeCount-3"
                className="ml-2 block text-sm text-gray-700"
              >
                3 sędziów
              </label>
            </div>
          </div>
          {errors.judgeCount && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.judgeCount}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="judgeGender"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Płeć sędziego przewodniczącego
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="judgeGender-female"
                name="judgeGender"
                value="female"
                checked={formData.judgeGender === "female"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="judgeGender-female"
                className="ml-2 block text-sm text-gray-700"
              >
                Kobieta
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="judgeGender-male"
                name="judgeGender"
                value="male"
                checked={formData.judgeGender === "male"}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="judgeGender-male"
                className="ml-2 block text-sm text-gray-700"
              >
                Mężczyzna
              </label>
            </div>
          </div>
          {errors.judgeGender && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.judgeGender}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6">
        <label
          htmlFor="judgeSatisfaction"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          W jakim stopniu uważasz, że wysokość alimentów określona w
          postanowieniu/wyroku była adekwatna do Twojej sytuacji?
        </label>
        <div className="flex items-center space-x-1">
          <span className="text-sm text-gray-500">1</span>
          <input
            type="range"
            id="judgeSatisfaction"
            min="1"
            max="5"
            value={formData.judgeSatisfaction || 3}
            onChange={handleSatisfactionChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-500">5</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500 px-1">
          <span>Całkowita nieadekwatność</span>
          <span>Pełna adekwatność</span>
        </div>
      </div>
    </div>
  );
};

export default Step4Court;
