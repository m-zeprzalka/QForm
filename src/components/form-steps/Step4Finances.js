"use client";

import { AlertCircle, HelpCircle } from "lucide-react";

const Step4Finances = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Dochody i koszty życia rodziców
        </h2>
        <p className="text-gray-600">
          Sąd decydując o wysokości alimentów bierze pod uwagę nie tylko
          oficjalne dochody, ale również praktyki rynkowe oraz Twoje możliwości
          zarobkowe. Aby otrzymać wiarygodny raport, podaj jak najbardziej
          rzetelne informacje o dochodach i kosztach.
        </p>
      </div>

      {/* Twoje dochody i koszty */}
      <div className="bg-white p-5 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Twoje dochody i koszty
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <div className="flex items-center">
              <label
                htmlFor="userIncome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Oficjalne dochody netto (zł/miesiąc)
              </label>
              <div className="ml-1 group relative">
                <HelpCircle size={16} className="text-gray-400 cursor-help" />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-full ml-1 px-2 py-1 bg-gray-800 text-white text-xs rounded w-64 z-10">
                  Podaj swoje oficjalne dochody netto za ostatnie 12 miesięcy,
                  uśrednione miesięcznie.
                </div>
              </div>
            </div>
            <input
              type="number"
              id="userIncome"
              name="userIncome"
              value={formData.userIncome}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.userIncome ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Kwota w złotych"
            />
            {errors.userIncome && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.userIncome}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center">
              <label
                htmlFor="userPotentialIncome"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Potencjał dochodowy (zł/miesiąc)
              </label>
              <div className="ml-1 group relative">
                <HelpCircle size={16} className="text-gray-400 cursor-help" />
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute left-full ml-1 px-2 py-1 bg-gray-800 text-white text-xs rounded w-64 z-10">
                  Szacunkowy dochód, jaki mógłbyś/mogłabyś osiągnąć mając na
                  uwadze kwalifikacje i możliwości.
                </div>
              </div>
            </div>
            <input
              type="number"
              id="userPotentialIncome"
              name="userPotentialIncome"
              value={formData.userPotentialIncome}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.userPotentialIncome
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Kwota w złotych"
            />
            {errors.userPotentialIncome && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.userPotentialIncome}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="userLivingCosts"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Koszty utrzymania siebie (zł/miesiąc)
            </label>
            <input
              type="number"
              id="userLivingCosts"
              name="userLivingCosts"
              value={formData.userLivingCosts}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.userLivingCosts ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Kwota w złotych"
            />
            {errors.userLivingCosts && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.userLivingCosts}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="userDependantsCosts"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Koszty utrzymania innych osób na utrzymaniu (zł/miesiąc)
            </label>
            <input
              type="number"
              id="userDependantsCosts"
              name="userDependantsCosts"
              value={formData.userDependantsCosts}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kwota w złotych"
            />
          </div>

          <div>
            <label
              htmlFor="userAdditionalObligations"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dodatkowe zobowiązania (zł/miesiąc)
            </label>
            <input
              type="number"
              id="userAdditionalObligations"
              name="userAdditionalObligations"
              value={formData.userAdditionalObligations}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kwota w złotych"
            />
          </div>
        </div>
      </div>

      {/* Dochody i koszty drugiego rodzica */}
      <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Dochody i koszty drugiego rodzica
        </h3>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label
              htmlFor="otherParentIncome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Oficjalne dochody netto (zł/miesiąc)
            </label>
            <input
              type="number"
              id="otherParentIncome"
              name="otherParentIncome"
              value={formData.otherParentIncome}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.otherParentIncome ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Kwota w złotych"
            />
            {errors.otherParentIncome && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.otherParentIncome}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="otherParentPotentialIncome"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Potencjał dochodowy (zł/miesiąc)
            </label>
            <input
              type="number"
              id="otherParentPotentialIncome"
              name="otherParentPotentialIncome"
              value={formData.otherParentPotentialIncome}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kwota w złotych"
            />
          </div>

          <div>
            <label
              htmlFor="otherParentLivingCosts"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Koszty utrzymania (zł/miesiąc)
            </label>
            <input
              type="number"
              id="otherParentLivingCosts"
              name="otherParentLivingCosts"
              value={formData.otherParentLivingCosts}
              onChange={handleChange}
              min="0"
              className={`w-full px-3 py-2 border ${
                errors.otherParentLivingCosts
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Kwota w złotych"
            />
            {errors.otherParentLivingCosts && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.otherParentLivingCosts}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="otherParentDependantsCosts"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Koszty utrzymania innych osób na utrzymaniu (zł/miesiąc)
            </label>
            <input
              type="number"
              id="otherParentDependantsCosts"
              name="otherParentDependantsCosts"
              value={formData.otherParentDependantsCosts}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kwota w złotych"
            />
          </div>

          <div>
            <label
              htmlFor="otherParentAdditionalObligations"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Dodatkowe zobowiązania (zł/miesiąc)
            </label>
            <input
              type="number"
              id="otherParentAdditionalObligations"
              name="otherParentAdditionalObligations"
              value={formData.otherParentAdditionalObligations}
              onChange={handleChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Kwota w złotych"
            />
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
        <div className="flex items-start">
          <HelpCircle
            size={20}
            className="text-yellow-500 mr-2 mt-0.5 flex-shrink-0"
          />
          <div>
            <p className="text-sm text-yellow-800 font-medium mb-2">
              Ważne informacje dotyczące kosztów:
            </p>
            <ul className="text-sm text-yellow-700 space-y-1 list-disc pl-5">
              <li>
                Prosimy o podanie rzeczywistych miesięcznych kwot, aby uzyskać
                jak najbardziej precyzyjną analizę.
              </li>
              <li>
                Nieregularne wydatki, takie jak wakacje czy opłaty roczne,
                należy uwzględnić proporcjonalnie, dzieląc je przez 12.
              </li>
              <li>
                Unikaj uwzględniania tych samych kosztów w kilku kategoriach
                (np. koszty prowadzenia działalności nie powinny być liczone
                ponownie w kosztach utrzymania).
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Finances;
