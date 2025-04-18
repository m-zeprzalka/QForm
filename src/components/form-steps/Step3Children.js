// src/components/form-steps/Step3Children.js
import { useState } from "react";
import { PlusCircle, MinusCircle, AlertCircle } from "lucide-react";

const Step3Children = ({ formData, handleChange, updateFormData, errors }) => {
  // Funkcja do aktualizacji danych dziecka
  const updateChildData = (index, field, value) => {
    const updatedChildren = [...formData.children];
    updatedChildren[index] = {
      ...updatedChildren[index],
      [field]: value,
    };

    updateFormData({
      children: updatedChildren,
    });
  };

  // Funkcja do dodania dziecka
  const addChild = () => {
    const newChildrenCount = formData.childrenCount + 1;

    updateFormData({
      childrenCount: newChildrenCount,
      children: [
        ...formData.children,
        {
          age: "",
          attendsEducation: false,
          educationType: "",
          userCosts: "",
          otherParentCosts: "",
          courtRecognizedCosts: "",
          alimentAmount: "",
          hasFamilyPension: false,
          hasCareTaking: false,
          hasOtherSources: false,
          otherSourcesDescription: "",
          careType: "shared_equally",
          careSchedule: {
            cycleType: "weekly",
            scheduleData: {},
          },
        },
      ],
    });
  };

  // Funkcja do usunięcia dziecka
  const removeChild = (index) => {
    const newChildrenCount = formData.childrenCount - 1;
    const updatedChildren = formData.children.filter((_, i) => i !== index);

    updateFormData({
      childrenCount: newChildrenCount,
      children: updatedChildren,
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Informacje o alimentach i dzieciach
        </h2>
        <p className="text-gray-600">
          Podaj informacje o podstawie ustalenia alimentów i dzieciach objętych
          alimentami.
        </p>
      </div>

      {/* Podstawa ustalenia alimentów */}
      <div className="space-y-4">
        <div>
          <label
            htmlFor="alimentBasis"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Podstawa ustalenia alimentów
          </label>
          <select
            id="alimentBasis"
            name="alimentBasis"
            value={formData.alimentBasis}
            onChange={handleChange}
            className={`mt-1 block w-full py-2 px-3 border ${
              errors.alimentBasis ? "border-red-500" : "border-gray-300"
            } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
          >
            <option value="">Wybierz podstawę</option>
            <option value="court_order">Postanowienie zabezpieczające</option>
            <option value="divorce_decree">Wyrok rozwodowy</option>
            <option value="parental_agreement">
              Porozumienie rodzicielskie
            </option>
            <option value="other">Inne</option>
          </select>
          {errors.alimentBasis && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.alimentBasis}
            </p>
          )}
        </div>

        {formData.alimentBasis === "other" && (
          <div>
            <label
              htmlFor="alimentBasisOther"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Inna podstawa ustalenia alimentów
            </label>
            <input
              type="text"
              id="alimentBasisOther"
              name="alimentBasisOther"
              value={formData.alimentBasisOther}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.alimentBasisOther ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Podaj inną podstawę"
            />
            {errors.alimentBasisOther && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.alimentBasisOther}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Liczba dzieci */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Liczba dzieci objętych alimentami: {formData.childrenCount}
        </label>
        <p className="text-gray-500 text-sm mb-2">
          Możesz dodać lub usunąć dzieci używając przycisków poniżej.
        </p>
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={addChild}
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg transition-colors duration-200"
          >
            <PlusCircle size={16} className="mr-1" />
            Dodaj dziecko
          </button>
          {formData.childrenCount > 1 && (
            <button
              type="button"
              onClick={() => removeChild(formData.children.length - 1)}
              className="flex items-center text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded-lg transition-colors duration-200"
            >
              <MinusCircle size={16} className="mr-1" />
              Usuń dziecko
            </button>
          )}
        </div>
      </div>

      {/* Informacje o dzieciach */}
      {formData.children.map((child, index) => (
        <div
          key={index}
          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
        >
          <h3 className="font-medium text-gray-800 mb-4">
            Dziecko {index + 1}
            {formData.childrenCount > 1 && index > 0 && (
              <button
                type="button"
                onClick={() => removeChild(index)}
                className="ml-2 text-xs text-red-600 hover:text-red-800"
              >
                (usuń)
              </button>
            )}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor={`children[${index}].age`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Wiek dziecka
              </label>
              <input
                type="number"
                id={`children[${index}].age`}
                name={`children[${index}].age`}
                value={child.age}
                min="0"
                max="25"
                onChange={(e) => {
                  updateChildData(index, "age", e.target.value);
                }}
                className={`w-full px-3 py-2 border ${
                  errors[`children[${index}].age`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Wiek w latach"
              />
              {errors[`children[${index}].age`] && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors[`children[${index}].age`]}
                </p>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`children[${index}].attendsEducation`}
                  name={`children[${index}].attendsEducation`}
                  checked={child.attendsEducation}
                  onChange={(e) => {
                    updateChildData(
                      index,
                      "attendsEducation",
                      e.target.checked
                    );
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`children[${index}].attendsEducation`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Dziecko uczęszcza do placówki edukacyjnej
                </label>
              </div>

              {child.attendsEducation && (
                <div>
                  <label
                    htmlFor={`children[${index}].educationType`}
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Rodzaj placówki
                  </label>
                  <select
                    id={`children[${index}].educationType`}
                    name={`children[${index}].educationType`}
                    value={child.educationType}
                    onChange={(e) => {
                      updateChildData(index, "educationType", e.target.value);
                    }}
                    className={`mt-1 block w-full py-2 px-3 border ${
                      errors[`children[${index}].educationType`]
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
                  >
                    <option value="">Wybierz rodzaj placówki</option>
                    <option value="nursery">Żłobek</option>
                    <option value="kindergarten">Przedszkole</option>
                    <option value="primary_school">Szkoła podstawowa</option>
                    <option value="secondary_school">
                      Szkoła ponadpodstawowa
                    </option>
                  </select>
                  {errors[`children[${index}].educationType`] && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle size={14} className="mr-1" />
                      {errors[`children[${index}].educationType`]}
                    </p>
                  )}
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor={`children[${index}].userCosts`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Koszty ponoszone przez Ciebie (zł/miesiąc)
              </label>
              <input
                type="number"
                id={`children[${index}].userCosts`}
                name={`children[${index}].userCosts`}
                value={child.userCosts}
                min="0"
                onChange={(e) => {
                  updateChildData(index, "userCosts", e.target.value);
                }}
                className={`w-full px-3 py-2 border ${
                  errors[`children[${index}].userCosts`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Kwota w złotych"
              />
              {errors[`children[${index}].userCosts`] && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors[`children[${index}].userCosts`]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`children[${index}].otherParentCosts`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Koszty ponoszone przez drugiego rodzica (zł/miesiąc)
              </label>
              <input
                type="number"
                id={`children[${index}].otherParentCosts`}
                name={`children[${index}].otherParentCosts`}
                value={child.otherParentCosts}
                min="0"
                onChange={(e) => {
                  updateChildData(index, "otherParentCosts", e.target.value);
                }}
                className={`w-full px-3 py-2 border ${
                  errors[`children[${index}].otherParentCosts`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Kwota w złotych"
              />
              {errors[`children[${index}].otherParentCosts`] && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors[`children[${index}].otherParentCosts`]}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor={`children[${index}].alimentAmount`}
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kwota alimentów (zł/miesiąc)
              </label>
              <input
                type="number"
                id={`children[${index}].alimentAmount`}
                name={`children[${index}].alimentAmount`}
                value={child.alimentAmount}
                min="0"
                onChange={(e) => {
                  updateChildData(index, "alimentAmount", e.target.value);
                }}
                className={`w-full px-3 py-2 border ${
                  errors[`children[${index}].alimentAmount`]
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Kwota alimentów"
              />
              {errors[`children[${index}].alimentAmount`] && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle size={14} className="mr-1" />
                  {errors[`children[${index}].alimentAmount`]}
                </p>
              )}
            </div>

            {["court_order", "divorce_decree"].includes(
              formData.alimentBasis
            ) && (
              <div>
                <label
                  htmlFor={`children[${index}].courtRecognizedCosts`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Koszty uznane przez sąd (zł/miesiąc, opcjonalnie)
                </label>
                <input
                  type="number"
                  id={`children[${index}].courtRecognizedCosts`}
                  name={`children[${index}].courtRecognizedCosts`}
                  value={child.courtRecognizedCosts}
                  min="0"
                  onChange={(e) => {
                    updateChildData(
                      index,
                      "courtRecognizedCosts",
                      e.target.value
                    );
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Kwota w złotych"
                />
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Czy dziecko ma inne źródła utrzymania?
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`children[${index}].hasFamilyPension`}
                  name={`children[${index}].hasFamilyPension`}
                  checked={child.hasFamilyPension}
                  onChange={(e) => {
                    updateChildData(
                      index,
                      "hasFamilyPension",
                      e.target.checked
                    );
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`children[${index}].hasFamilyPension`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Renta rodzinna
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`children[${index}].hasCareTaking`}
                  name={`children[${index}].hasCareTaking`}
                  checked={child.hasCareTaking}
                  onChange={(e) => {
                    updateChildData(index, "hasCareTaking", e.target.checked);
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`children[${index}].hasCareTaking`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Świadczenie pielęgnacyjne
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`children[${index}].hasOtherSources`}
                  name={`children[${index}].hasOtherSources`}
                  checked={child.hasOtherSources}
                  onChange={(e) => {
                    updateChildData(index, "hasOtherSources", e.target.checked);
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor={`children[${index}].hasOtherSources`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Inne źródła
                </label>
              </div>
            </div>

            {child.hasOtherSources && (
              <div className="mt-2">
                <label
                  htmlFor={`children[${index}].otherSourcesDescription`}
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Opis innych źródeł utrzymania
                </label>
                <input
                  type="text"
                  id={`children[${index}].otherSourcesDescription`}
                  name={`children[${index}].otherSourcesDescription`}
                  value={child.otherSourcesDescription}
                  onChange={(e) => {
                    updateChildData(
                      index,
                      "otherSourcesDescription",
                      e.target.value
                    );
                  }}
                  className={`w-full px-3 py-2 border ${
                    errors[`children[${index}].otherSourcesDescription`]
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Opisz inne źródła utrzymania"
                />
                {errors[`children[${index}].otherSourcesDescription`] && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors[`children[${index}].otherSourcesDescription`]}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sposób sprawowania pieczy
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`children[${index}].careType-shared`}
                  name={`children[${index}].careType`}
                  value="shared_equally"
                  checked={child.careType === "shared_equally"}
                  onChange={(e) => {
                    updateChildData(index, "careType", e.target.value);
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`children[${index}].careType-shared`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Opieka naprzemienna (50/50)
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id={`children[${index}].careType-custom`}
                  name={`children[${index}].careType`}
                  value="custom"
                  checked={child.careType === "custom"}
                  onChange={(e) => {
                    updateChildData(index, "careType", e.target.value);
                  }}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor={`children[${index}].careType-custom`}
                  className="ml-2 block text-sm text-gray-700"
                >
                  Inna
                </label>
              </div>
            </div>

            {child.careType === "custom" && (
              <div className="mt-3 p-3 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-600 mb-2">
                  W pełnej wersji formularza, tutaj znajdowałaby się tabela do
                  określenia szczegółowego podziału opieki. Dla uproszczenia
                  MVP, ta funkcjonalność będzie dodana w kolejnej wersji.
                </p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Step3Children;
