"use client";

import { useState } from "react";
import {
  Check,
  ArrowRight,
  ArrowLeft,
  User,
  Mail,
  Phone,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    agreeToTerms: false,
    dataProcessingConsent: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Validacja pól formularza
  const validateStep = (currentStep) => {
    let stepErrors = {};

    if (currentStep === 1) {
      if (!formData.firstName.trim())
        stepErrors.firstName = "Imię jest wymagane";
      if (!formData.lastName.trim())
        stepErrors.lastName = "Nazwisko jest wymagane";
    }

    if (currentStep === 2) {
      if (!formData.email.trim()) {
        stepErrors.email = "Email jest wymagany";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        stepErrors.email = "Niepoprawny format email";
      }

      if (!formData.phone.trim()) {
        stepErrors.phone = "Numer telefonu jest wymagany";
      } else if (!/^\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
        stepErrors.phone = "Numer powinien zawierać 9 cyfr";
      }
    }

    if (currentStep === 3) {
      if (!formData.agreeToTerms)
        stepErrors.agreeToTerms = "Zgoda jest wymagana";
      if (!formData.dataProcessingConsent)
        stepErrors.dataProcessingConsent = "Zgoda jest wymagana";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  // Obsługa zmiany pola
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Usuwanie błędu po wprowadzeniu wartości
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  // Przejście do następnego kroku
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  // Powrót do poprzedniego kroku
  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Obsługa wysłania formularza
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(step)) {
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Wystąpił błąd podczas wysyłania formularza"
          );
        }

        setIsSubmitting(false);
        setIsSubmitted(true);
      } catch (error) {
        console.error("Błąd:", error);
        setIsSubmitting(false);
        // Tutaj można dodać obsługę błędów
      }
    }
  };

  // Nawigacja i postęp
  const renderProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Krok {step} z 3
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((step / 3) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(step / 3) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Zawartość kroków formularza
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Dane osobowe
            </h2>
            <p className="text-gray-600">
              Wprowadź swoje podstawowe dane kontaktowe.
            </p>

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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Dane kontaktowe
            </h2>
            <p className="text-gray-600">
              Podaj swoje dane kontaktowe. Będziemy komunikować się z Tobą tylko
              w razie potrzeby.
            </p>

            <div className="space-y-4">
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

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Zgody i podsumowanie
            </h2>
            <p className="text-gray-600">
              Prosimy o zapoznanie się i akceptację regulaminu oraz wyrażenie
              zgody na przetwarzanie danych.
            </p>

            <div className="space-y-6">
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

              <div className="space-y-3">
                <div className="relative flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeToTerms"
                      name="agreeToTerms"
                      type="checkbox"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className={`h-4 w-4 text-blue-600 border ${
                        errors.agreeToTerms
                          ? "border-red-500"
                          : "border-gray-300"
                      } rounded focus:ring-blue-500`}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="agreeToTerms"
                      className="font-medium text-gray-700"
                    >
                      Akceptuję{" "}
                      <a href="#" className="text-blue-600 hover:underline">
                        regulamin
                      </a>{" "}
                      serwisu
                    </label>
                    {errors.agreeToTerms && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.agreeToTerms}
                      </p>
                    )}
                  </div>
                </div>

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
                      Wyrażam zgodę na przetwarzanie moich danych osobowych
                      zgodnie z
                      <a
                        href="#"
                        className="text-blue-600 hover:underline ml-1"
                      >
                        polityką prywatności
                      </a>
                    </label>
                    {errors.dataProcessingConsent && (
                      <p className="mt-1 text-sm text-red-600 flex items-center">
                        <AlertCircle size={14} className="mr-1" />
                        {errors.dataProcessingConsent}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start">
                <Shield
                  size={20}
                  className="text-blue-500 flex-shrink-0 mt-0.5"
                />
                <p className="ml-3 text-sm text-blue-700">
                  Twoje dane są bezpieczne. Stosujemy szyfrowanie i
                  pseudonimizację w celu ochrony Twoich danych zgodnie z
                  wymogami RODO.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Przyciski nawigacji
  const renderButtons = () => {
    return (
      <div className="flex justify-between mt-8">
        {step > 1 ? (
          <button
            type="button"
            onClick={prevStep}
            className="flex items-center text-gray-600 bg-gray-100 hover:bg-gray-200 px-5 py-3 rounded-lg transition-colors duration-200"
          >
            <ArrowLeft size={18} className="mr-1" />
            Wstecz
          </button>
        ) : (
          <div></div>
        )}

        {step < 3 ? (
          <button
            type="button"
            onClick={nextStep}
            className="flex items-center text-white bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-lg ml-auto transition-colors duration-200"
          >
            Dalej
            <ArrowRight size={18} className="ml-1" />
          </button>
        ) : (
          <button
            type="submit"
            className={`flex items-center text-white bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg ml-auto transition-all duration-200 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Przetwarzanie...
              </>
            ) : (
              <>
                Wyślij formularz
                <Check size={18} className="ml-1" />
              </>
            )}
          </button>
        )}
      </div>
    );
  };

  // Ekran podziękowania po wysłaniu formularza
  if (isSubmitted) {
    return (
      <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8 text-center">
        <div className="p-6 flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Dziękujemy!</h2>
          <p className="text-gray-600">
            Twój formularz został pomyślnie wysłany. Otrzymasz wkrótce
            potwierdzenie na podany adres email.
          </p>
          <div className="pt-4">
            <button
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  firstName: "",
                  lastName: "",
                  email: "",
                  phone: "",
                  agreeToTerms: false,
                  dataProcessingConsent: false,
                });
                setStep(1);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Wypełnij formularz ponownie
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="pt-6 px-6 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h1 className="text-2xl font-bold text-gray-800">Formularz danych</h1>
        <p className="text-gray-600 mt-1">
          Wypełnij poniższy formularz, aby wziąć udział w projekcie.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {renderProgress()}
        {renderStep()}
        {renderButtons()}
      </form>
    </div>
  );
};

export default MultiStepForm;
