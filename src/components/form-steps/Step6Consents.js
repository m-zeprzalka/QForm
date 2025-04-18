import { AlertCircle, Shield } from "lucide-react";

const Step6Consents = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Zgody i podsumowanie
        </h2>
        <p className="text-gray-600">
          Aby sfinalizować proces, prosimy o zapoznanie się z poniższymi
          informacjami i wyrażenie zgód.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-800 mb-2">Twoje dane</h3>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-gray-500">Imię:</p>
            <p className="font-medium">{formData.firstName}</p>
          </div>
          <div>
            <p className="text-gray-500">Nazwisko:</p>
            <p className="font-medium">{formData.lastName}</p>
          </div>
          <div>
            <p className="text-gray-500">Email:</p>
            <p className="font-medium">{formData.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Telefon:</p>
            <p className="font-medium">{formData.phone}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
          <Shield size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
          <p className="ml-3 text-sm text-blue-700">
            Twoje dane są bezpieczne. Stosujemy szyfrowanie i pseudonimizację w
            celu ochrony Twoich danych zgodnie z wymogami RODO.
          </p>
        </div>

        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="agreeToTerms"
              name="agreeToTerms"
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              className={`h-4 w-4 text-blue-600 border ${
                errors.agreeToTerms ? "border-red-500" : "border-gray-300"
              } rounded focus:ring-blue-500`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label htmlFor="agreeToTerms" className="font-medium text-gray-700">
              Akceptuję regulamin serwisu
            </label>
            <p className="text-gray-500">
              Zapoznałem/am się z regulaminem i akceptuję jego warunki.
            </p>
            {errors.agreeToTerms && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.agreeToTerms}
              </p>
            )}
          </div>
        </div>

        {/* Pozostałe zgody bez zmian */}
        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="dataProcessingConsent"
              name="dataProcessingConsent"
              type="checkbox"
              checked={formData.dataProcessingConsent}
              onChange={handleChange}
              className={`h-4 w-4 text-blue-600 border ${
                errors.dataProcessingConsent
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:ring-blue-500`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="dataProcessingConsent"
              className="font-medium text-gray-700"
            >
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu
              generowania raportów.
            </label>
            <p className="text-gray-500">
              Dane będą przetwarzane zgodnie z polityką prywatności AliMatrix.
              Możesz w każdej chwili wycofać zgodę kontaktując się z nami.
            </p>
            {errors.dataProcessingConsent && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.dataProcessingConsent}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex items-start">
          <div className="flex items-center h-5">
            <input
              id="communicationConsent"
              name="communicationConsent"
              type="checkbox"
              checked={formData.communicationConsent}
              onChange={handleChange}
              className={`h-4 w-4 text-blue-600 border ${
                errors.communicationConsent
                  ? "border-red-500"
                  : "border-gray-300"
              } rounded focus:ring-blue-500`}
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="communicationConsent"
              className="font-medium text-gray-700"
            >
              Wyrażam zgodę na komunikację w celu dostarczenia personalizowanego
              raportu na mój adres email.
            </label>
            <p className="text-gray-500">
              Twój adres email będzie przechowywany oddzielnie od pozostałych
              danych. Będziemy kontaktować się z Tobą wyłącznie w sprawach
              związanych z raportem.
            </p>
            {errors.communicationConsent && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle size={14} className="mr-1" />
                {errors.communicationConsent}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <h3 className="font-medium text-green-800 mb-2">Co dalej?</h3>
        <p className="text-green-700 text-sm">
          Po wysłaniu formularza, otrzymasz na podany adres email potwierdzenie
          wraz z informacją o dostępie do raportu. Dziękujemy za udział w
          projekcie AliMatrix!
        </p>
      </div>
    </div>
  );
};

export default Step6Consents;
