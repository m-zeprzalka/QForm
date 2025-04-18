"use client";

import { useState } from "react";
import { Check, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";

import Step1Introduction from "./form-steps/Step1Introduction";
import Step2UserData from "./form-steps/Step2UserData";
import Step3Children from "./form-steps/Step3Children";
import Step4Court from "./form-steps/Step4Court";
import Step5Income from "./form-steps/Step5Income";
import Step6Consents from "./form-steps/Step6Consents";

const AliMatrixForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    ageRange: "",
    voivodeship: "",
    residenceType: "",
    otherParentGender: "",
    otherParentAgeRange: "",
    otherParentVoivodeship: "",
    otherParentResidenceType: "",
    maritalStatus: "",
    divorceInitiator: "",
    faultClaim: false,
    alimentBasis: "",
    alimentBasisOther: "",
    childrenCount: 1,
    children: [
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
    courtDate: "",
    courtType: "",
    courtLocation: "",
    judgeCount: 1,
    judgeGender: "",
    judgeSatisfaction: 3,
    userIncome: "",
    userPotentialIncome: "",
    userLivingCosts: "",
    userDependantsCosts: "",
    userAdditionalObligations: "",
    otherParentIncome: "",
    otherParentPotentialIncome: "",
    otherParentLivingCosts: "",
    otherParentDependantsCosts: "",
    otherParentAdditionalObligations: "",
    dataProcessingConsent: false,
    communicationConsent: false,
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateStep = (currentStep) => {
    let stepErrors = {};

    switch (currentStep) {
      case 1:
        if (!formData.firstName.trim())
          stepErrors.firstName = "Imię jest wymagane";
        if (!formData.lastName.trim())
          stepErrors.lastName = "Nazwisko jest wymagane";
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
        break;

      case 2:
        if (!formData.gender) stepErrors.gender = "Wybierz płeć";
        if (!formData.ageRange)
          stepErrors.ageRange = "Wybierz przedział wiekowy";
        if (!formData.voivodeship)
          stepErrors.voivodeship = "Wybierz województwo";
        if (!formData.residenceType)
          stepErrors.residenceType = "Wybierz miejsce zamieszkania";
        if (!formData.otherParentGender)
          stepErrors.otherParentGender = "Wybierz płeć drugiego rodzica";
        if (!formData.otherParentAgeRange)
          stepErrors.otherParentAgeRange =
            "Wybierz przedział wiekowy drugiego rodzica";
        if (!formData.otherParentVoivodeship)
          stepErrors.otherParentVoivodeship =
            "Wybierz województwo drugiego rodzica";
        if (!formData.otherParentResidenceType)
          stepErrors.otherParentResidenceType =
            "Wybierz miejsce zamieszkania drugiego rodzica";
        if (!formData.maritalStatus)
          stepErrors.maritalStatus = "Wybierz stan cywilny";
        break;

      case 3:
        if (!formData.alimentBasis)
          stepErrors.alimentBasis = "Wybierz podstawę ustalenia alimentów";
        if (
          formData.alimentBasis === "other" &&
          !formData.alimentBasisOther.trim()
        ) {
          stepErrors.alimentBasisOther =
            "Podaj inną podstawę ustalenia alimentów";
        }
        if (!formData.childrenCount || formData.childrenCount < 1) {
          stepErrors.childrenCount = "Podaj liczbę dzieci objętych alimentami";
        }
        formData.children.forEach((child, index) => {
          if (!child.age || child.age < 0) {
            stepErrors[`children[${index}].age`] =
              "Podaj poprawny wiek dziecka";
          }
          if (!child.userCosts || isNaN(parseFloat(child.userCosts))) {
            stepErrors[`children[${index}].userCosts`] =
              "Podaj koszty ponoszone przez Ciebie";
          }
          if (
            !child.otherParentCosts ||
            isNaN(parseFloat(child.otherParentCosts))
          ) {
            stepErrors[`children[${index}].otherParentCosts`] =
              "Podaj koszty ponoszone przez drugiego rodzica";
          }
          if (!child.alimentAmount || isNaN(parseFloat(child.alimentAmount))) {
            stepErrors[`children[${index}].alimentAmount`] =
              "Podaj kwotę alimentów";
          }
        });
        break;

      case 4:
        if (["court_order", "divorce_decree"].includes(formData.alimentBasis)) {
          if (!formData.courtDate)
            stepErrors.courtDate = "Podaj datę wydania postanowienia";
          if (!formData.courtType) stepErrors.courtType = "Wybierz rodzaj sądu";
          if (!formData.courtLocation)
            stepErrors.courtLocation = "Wybierz miejscowość sądu";
          if (!formData.judgeGender)
            stepErrors.judgeGender = "Wybierz płeć sędziego";
        }
        break;

      case 5:
        if (!formData.userIncome || isNaN(parseFloat(formData.userIncome))) {
          stepErrors.userIncome = "Podaj swój dochód";
        }
        if (
          !formData.userLivingCosts ||
          isNaN(parseFloat(formData.userLivingCosts))
        ) {
          stepErrors.userLivingCosts = "Podaj koszty swojego utrzymania";
        }
        if (
          !formData.otherParentIncome ||
          isNaN(parseFloat(formData.otherParentIncome))
        ) {
          stepErrors.otherParentIncome = "Podaj dochód drugiego rodzica";
        }
        break;

      case 6:
        if (!formData.dataProcessingConsent) {
          stepErrors.dataProcessingConsent =
            "Zgoda na przetwarzanie danych jest wymagana";
        }
        if (!formData.communicationConsent) {
          stepErrors.communicationConsent =
            "Zgoda na komunikację jest wymagana";
        }
        if (!formData.agreeToTerms) {
          stepErrors.agreeToTerms = "Musisz zaakceptować regulamin";
        }
        break;
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const handleChange = (e) => {
    if (!e || !e.target) {
      console.error("Nieprawidłowy event:", e);
      return;
    }

    const { name, value, type, checked } = e.target;

    if (!name) {
      console.error("Brak nazwy pola w evencie:", e);
      return;
    }

    if (name.startsWith("children[")) {
      const match = name.match(/children\[(\d+)\]\.(.+)/);
      if (match) {
        const childIndex = parseInt(match[1]);
        const fieldName = match[2];

        const updatedChildren = [...formData.children];

        if (childIndex >= 0 && childIndex < updatedChildren.length) {
          updatedChildren[childIndex] = {
            ...updatedChildren[childIndex],
            [fieldName]: type === "checkbox" ? checked : value,
          };

          setFormData({
            ...formData,
            children: updatedChildren,
          });

          if (errors[name]) {
            const updatedErrors = { ...errors };
            delete updatedErrors[name];
            setErrors(updatedErrors);
          }
        }

        return;
      }
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const updateFormData = (newData) => {
    setFormData({ ...formData, ...newData });
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateStep(step)) {
      setIsSubmitting(true);

      try {
        const response = await fetch("/api/submit-alimatrix-form", {
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
        alert("Wystąpił błąd podczas wysyłania formularza: " + error.message);
      }
    }
  };

  const renderProgress = () => {
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-500">
            Krok {step} z {totalSteps}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round((step / totalSteps) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(step / totalSteps) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

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

        {step < totalSteps ? (
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

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <Step1Introduction
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 2:
        return (
          <Step2UserData
            formData={formData}
            handleChange={handleChange}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <Step3Children
            formData={formData}
            handleChange={handleChange}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <Step4Court
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 5:
        return (
          <Step5Income
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      case 6:
        return (
          <Step6Consents
            formData={formData}
            handleChange={handleChange}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

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
            potwierdzenie na podany adres email wraz z informacją o dostępie do
            raportu.
          </p>
          <p className="text-gray-600 mt-2">
            Twoje dane pomogą innym osobom w podobnej sytuacji, a także
            przyczynią się do większej transparentności procesu ustalania
            alimentów w Polsce.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="pt-6 px-6 pb-2 bg-gradient-to-r from-blue-50 to-indigo-50">
        <h1 className="text-2xl font-bold text-gray-800">
          Formularz AliMatrix
        </h1>
        <p className="text-gray-600 mt-1">
          Wypełnij poniższy formularz, aby uzyskać spersonalizowany raport.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        {renderProgress()}
        {renderStepContent()}
        {renderButtons()}
      </form>
    </div>
  );
};

export default AliMatrixForm;
