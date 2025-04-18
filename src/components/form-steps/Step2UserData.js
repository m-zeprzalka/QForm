import { AlertCircle } from "lucide-react";

const VOIVODESHIPS = [
  "dolnośląskie",
  "kujawsko-pomorskie",
  "lubelskie",
  "lubuskie",
  "łódzkie",
  "małopolskie",
  "mazowieckie",
  "opolskie",
  "podkarpackie",
  "podlaskie",
  "pomorskie",
  "śląskie",
  "świętokrzyskie",
  "warmińsko-mazurskie",
  "wielkopolskie",
  "zachodniopomorskie",
];

const Step2UserData = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-8">
      {/* Twoje dane */}
      <div className="bg-blue-50 p-5 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Twoje dane</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Płeć
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="gender-female"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="gender-female"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Kobieta
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="gender-male"
                  name="gender"
                  value="male"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="gender-male"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Mężczyzna
                </label>
              </div>
            </div>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.gender}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="ageRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Wiek
            </label>
            <select
              id="ageRange"
              name="ageRange"
              value={formData.ageRange}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.ageRange ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz przedział wiekowy</option>
              <option value="below_25">poniżej 25 lat</option>
              <option value="25_34">25-34 lat</option>
              <option value="35_44">35-44 lat</option>
              <option value="45_54">45-54 lat</option>
              <option value="55_plus">55+ lat</option>
            </select>
            {errors.ageRange && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.ageRange}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="voivodeship"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Województwo zamieszkania
            </label>
            <select
              id="voivodeship"
              name="voivodeship"
              value={formData.voivodeship}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.voivodeship ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz województwo</option>
              {VOIVODESHIPS.map((voivodeship) => (
                <option key={voivodeship} value={voivodeship}>
                  {voivodeship}
                </option>
              ))}
            </select>
            {errors.voivodeship && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.voivodeship}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="residenceType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Miejsce zamieszkania
            </label>
            <select
              id="residenceType"
              name="residenceType"
              value={formData.residenceType}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.residenceType ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz rodzaj miejscowości</option>
              <option value="village">Wieś</option>
              <option value="small_city">Miasto do 50 tys. mieszkańców</option>
              <option value="medium_city">
                Miasto 50-200 tys. mieszkańców
              </option>
              <option value="large_city">
                Miasto powyżej 200 tys. mieszkańców
              </option>
            </select>
            {errors.residenceType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.residenceType}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Dane drugiego rodzica */}
      <div className="bg-gray-50 p-5 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Dane drugiego rodzica
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Płeć drugiego rodzica
            </label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="otherParentGender-female"
                  name="otherParentGender"
                  value="female"
                  checked={formData.otherParentGender === "female"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="otherParentGender-female"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Kobieta
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="otherParentGender-male"
                  name="otherParentGender"
                  value="male"
                  checked={formData.otherParentGender === "male"}
                  onChange={handleChange}
                  className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <label
                  htmlFor="otherParentGender-male"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Mężczyzna
                </label>
              </div>
            </div>
            {errors.otherParentGender && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.otherParentGender}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="otherParentAgeRange"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Wiek drugiego rodzica
            </label>
            <select
              id="otherParentAgeRange"
              name="otherParentAgeRange"
              value={formData.otherParentAgeRange}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.otherParentAgeRange
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz przedział wiekowy</option>
              <option value="below_25">poniżej 25 lat</option>
              <option value="25_34">25-34 lat</option>
              <option value="35_44">35-44 lat</option>
              <option value="45_54">45-54 lat</option>
              <option value="55_plus">55+ lat</option>
            </select>
            {errors.otherParentAgeRange && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.otherParentAgeRange}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="otherParentVoivodeship"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Województwo zamieszkania drugiego rodzica
            </label>
            <select
              id="otherParentVoivodeship"
              name="otherParentVoivodeship"
              value={formData.otherParentVoivodeship}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.otherParentVoivodeship
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz województwo</option>
              {VOIVODESHIPS.map((voivodeship) => (
                <option key={voivodeship} value={voivodeship}>
                  {voivodeship}
                </option>
              ))}
            </select>
            {errors.otherParentVoivodeship && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.otherParentVoivodeship}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="otherParentResidenceType"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Miejsce zamieszkania drugiego rodzica
            </label>
            <select
              id="otherParentResidenceType"
              name="otherParentResidenceType"
              value={formData.otherParentResidenceType}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.otherParentResidenceType
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz rodzaj miejscowości</option>
              <option value="village">Wieś</option>
              <option value="small_city">Miasto do 50 tys. mieszkańców</option>
              <option value="medium_city">
                Miasto 50-200 tys. mieszkańców
              </option>
              <option value="large_city">
                Miasto powyżej 200 tys. mieszkańców
              </option>
            </select>
            {errors.otherParentResidenceType && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.otherParentResidenceType}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Stan cywilny */}
      <div className="bg-blue-50 p-5 rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Stan cywilny
        </h2>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="maritalStatus"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stan cywilny
            </label>
            <select
              id="maritalStatus"
              name="maritalStatus"
              value={formData.maritalStatus}
              onChange={handleChange}
              className={`mt-1 block w-full py-2 px-3 border ${
                errors.maritalStatus ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
            >
              <option value="">Wybierz stan cywilny</option>
              <option value="divorce_no_fault">
                Rozwód bez orzeczenia o winie
              </option>
              <option value="divorce_with_fault">
                Rozwód z orzeczeniem o winie
              </option>
              <option value="in_divorce_proceedings">
                W trakcie postępowania rozwodowego
              </option>
              <option value="separation">W separacji</option>
              <option value="marriage">Małżeństwo</option>
              <option value="other">Inne</option>
            </select>
            {errors.maritalStatus && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.maritalStatus}
              </p>
            )}
          </div>

          {/* Dodatkowe pola dla osób w trakcie rozwodu lub po rozwodzie */}
          {((formData.maritalStatus &&
            formData.maritalStatus.includes("divorce")) ||
            formData.maritalStatus === "in_divorce_proceedings") && (
            <div className="space-y-4 mt-4 p-4 bg-white rounded-lg">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kto złożył pozew rozwodowy?
                </label>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="divorceInitiator-self"
                      name="divorceInitiator"
                      value="self"
                      checked={formData.divorceInitiator === "self"}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="divorceInitiator-self"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Ja
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="divorceInitiator-other"
                      name="divorceInitiator"
                      value="other_parent"
                      checked={formData.divorceInitiator === "other_parent"}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="divorceInitiator-other"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Drugi rodzic
                    </label>
                  </div>
                </div>
                {errors.divorceInitiator && (
                  <p className="mt-1 text-sm text-red-600 flex items-center">
                    <AlertCircle size={14} className="mr-1" />
                    {errors.divorceInitiator}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="faultClaim"
                    name="faultClaim"
                    checked={formData.faultClaim}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label
                    htmlFor="faultClaim"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Czy w pozwie jest aspekt orzeczenia o winie?
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2UserData;
