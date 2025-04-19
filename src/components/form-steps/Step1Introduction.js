// src/components/form-steps/Step1Introduction.js
import { User, Mail, Phone, AlertCircle } from "lucide-react";

const Step1Introduction = ({ formData, handleChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-3">
          Zaproszenie do udziału w AliMatrix
        </h2>
        <p className="text-gray-600 mb-4">
          Rozwód, rozstanie i ustalanie wysokości alimentów na dzieci to
          sytuacje, które mogą budzić niepewność i wiele pytań.{" "}
          <strong>AliMatrix</strong> to niezależna platforma, która pomaga Ci
          lepiej zrozumieć Twoją sytuację -- na podstawie rzeczywistych danych i
          obiektywnych analiz.
        </p>
        <div className="space-y-2 mb-4">
          <p className="text-gray-600 flex items-start">
            <span className="text-green-500 mr-2 flex-shrink-0">✔</span>
            <span>
              Otrzymasz <strong>spersonalizowany raport</strong>, który pomoże
              Ci ocenić, jak Twoja sytuacja wygląda na tle podobnych przypadków.
            </span>
          </p>
          <p className="text-gray-600 flex items-start">
            <span className="text-green-500 mr-2 flex-shrink-0">✔</span>
            <span>
              <strong>Wspierasz innych</strong> -- Twoje dane (przetwarzane w
              sposób anonimowy) pomogą tworzyć coraz dokładniejsze analizy dla
              osób w podobnej sytuacji.
            </span>
          </p>
          <p className="text-gray-600 flex items-start">
            <span className="text-green-500 mr-2 flex-shrink-0">✔</span>
            <span>
              <strong>Masz kontrolę</strong> -- Twoje dane pozostaną poufne, a
              raporty generowane przez AliMatrix nie będą ujawniały
              indywidualnych historii. Możesz je w każdej chwili edytować lub
              usunąć.
            </span>
          </p>
        </div>
        <p className="text-gray-600 mb-2">
          <strong>AliMatrix jest w pełni niezależny</strong> -- nie jest
          powiązany z żadnym innym komercyjnym przedsięwzięciem ani organizacją.
          Nie opowiada się po żadnej ze stron dyskusji -- jego celem jest{" "}
          <strong>rzetelna obiektywizacja kwestii alimentów</strong>, oparta na
          rzeczywistych danych. Priorytetem jest dobro dzieci oraz przejrzystość
          procesu ustalania alimentów.
        </p>
        <p className="text-gray-600">
          Dostęp do raportów jest odpłatny -- dzięki temu możemy rozwijać
          platformę i dostarczać coraz bardziej precyzyjne analizy. Dla
          pierwszych 300 osób, personalizowany raport gratis.{" "}
          <strong>AliMatrix działa zgodnie z RODO</strong>, a szczegóły
          dotyczące ochrony prywatności znajdziesz w naszej polityce
          prywatności.
        </p>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <p className="text-gray-600 mb-3">
          Wierzymy, że dokładność w zbieraniu danych jest kluczowa dla
          stworzenia precyzyjnych i wiarygodnych raportów, które pomogą Tobie i
          Twojemu dziecku. Wiemy, jak ważne jest to dla Ciebie, dlatego aby
          dostarczyć Ci jak najbardziej trafne informacje, musimy zebrać dane w
          sposób
          <strong> szczegółowy</strong>. Prosimy, zabezpiecz sobie{" "}
          <strong>około 60 minut</strong> na wypełnienie formularza.
        </p>
        <p className="text-gray-600">
          Formularz składa się z kilku sekcji, które obejmują obszary:
        </p>
        <ol className="list-decimal pl-5 mt-2 space-y-1 text-gray-600">
          <li>
            <strong>Informacje o dzieciach</strong> na które ustalane są
            alimenty.
          </li>
          <li>
            <strong>Harmonogram opieki</strong> nad dzieckiem.
          </li>
          <li>
            <strong>Dochody i koszty życia rodziców</strong> oraz wydatki
            związane z wychowaniem dzieci.
          </li>
          <li>
            <strong>Informacje o postępowaniu sądowym</strong> dotyczące statusu
            sprawy rozwodowej.
          </li>
          <li>
            <strong>Dane użytkownika</strong> dla bardziej miarodajnej analizy.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="firstName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Imię
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`pl-10 w-full px-3 py-3 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Twoje imię"
            />
          </div>
          {errors.firstName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nazwisko
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`pl-10 w-full px-3 py-3 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Twoje nazwisko"
            />
          </div>
          {errors.lastName && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.lastName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Adres email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-400" />
            </div>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 w-full px-3 py-3 border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="twoj@email.pl"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Numer telefonu
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={18} className="text-gray-400" />
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`pl-10 w-full px-3 py-3 border ${
                errors.phone ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="123 456 789"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle size={14} className="mr-1" />
              {errors.phone}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1Introduction;
