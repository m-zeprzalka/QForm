"use client";

import { useState, useEffect } from "react";
import { Download, Eye, AlertCircle } from "lucide-react";
import * as XLSX from "xlsx";

const POLISH_LABELS = {
  firstName: "Imię",
  lastName: "Nazwisko",
  email: "Email",
  phone: "Telefon",
  gender: "Płeć",
  ageRange: "Przedział wiekowy",
  voivodeship: "Województwo",
  residenceType: "Typ miejscowości",
  otherParentGender: "Płeć drugiego rodzica",
  otherParentAgeRange: "Przedział wiekowy drugiego rodzica",
  otherParentVoivodeship: "Województwo drugiego rodzica",
  otherParentResidenceType: "Typ miejscowości drugiego rodzica",
  maritalStatus: "Stan cywilny",
  divorceInitiator: "Inicjator rozwodu",
  faultClaim: "Roszczenie winy",
  alimentBasis: "Podstawa alimentów",
  alimentBasisOther: "Inna podstawa alimentów",
  courtDate: "Data postanowienia",
  courtType: "Rodzaj sądu",
  courtLocation: "Lokalizacja sądu",
  judgeCount: "Liczba sędziów",
  judgeGender: "Płeć sędziego",
  judgeSatisfaction: "Satysfakcja z wyroku",
  userIncome: "Dochód",
  userPotentialIncome: "Potencjalny dochód",
  userLivingCosts: "Koszty utrzymania",
  userDependantsCosts: "Koszty osób zależnych",
  userAdditionalObligations: "Dodatkowe zobowiązania",
  otherParentIncome: "Dochód drugiego rodzica",
  otherParentPotentialIncome: "Potencjalny dochód drugiego rodzica",
  otherParentLivingCosts: "Koszty utrzymania drugiego rodzica",
  otherParentDependantsCosts: "Koszty osób zależnych drugiego rodzica",
  otherParentAdditionalObligations: "Dodatkowe zobowiązania drugiego rodzica",
  childrenCount: "Liczba dzieci",
  dataProcessingConsent: "Zgoda na przetwarzanie danych",
  communicationConsent: "Zgoda na komunikację",
  agreeToTerms: "Zgoda na regulamin",
  ipHash: "Hash IP",
  hashedEmail: "Zahaszowany email",
  age: "Wiek",
  attendsEducation: "Uczęszcza do placówki",
  educationType: "Typ placówki",
  userCosts: "Koszty użytkownika",
  otherParentCosts: "Koszty drugiego rodzica",
  courtRecognizedCosts: "Koszty uznane przez sąd",
  alimentAmount: "Kwota alimentów",
  hasFamilyPension: "Renta rodzinna",
  hasCareTaking: "Świadczenie pielęgnacyjne",
  hasOtherSources: "Inne źródła dochodu",
  otherSourcesDescription: "Opis innych źródeł",
  careType: "Typ opieki",
};

const POLISH_VALUES = {
  male: "Mężczyzna",
  female: "Kobieta",
  below_25: "Poniżej 25 lat",
  "25_34": "25-34 lat",
  "35_44": "35-44 lat",
  "45_54": "45-54 lat",
  "55_plus": "55+ lat",
  village: "Wieś",
  small_city: "Małe miasto",
  medium_city: "Średnie miasto",
  large_city: "Duże miasto",
  divorce_no_fault: "Rozwód bez winy",
  divorce_with_fault: "Rozwód z winą",
  in_divorce_proceedings: "W trakcie rozwodu",
  separation: "Separacja",
  marriage: "Małżeństwo",
  other: "Inne",
  court_order: "Postanowienie sądu",
  divorce_decree: "Wyrok rozwodowy",
  parental_agreement: "Porozumienie rodziców",
  nursery: "Żłobek",
  kindergarten: "Przedszkole",
  primary_school: "Szkoła podstawowa",
  secondary_school: "Szkoła ponadpodstawowa",
  shared_equally: "Opieka naprzemienna",
  custom: "Indywidualna",
  district: "Sąd Rejonowy",
  regional: "Sąd Okręgowy",
};

// Funkcja do formatowania daty
const formatDate = (dateString) => {
  if (!dateString) return "Brak danych";
  try {
    const date = new Date(dateString);
    return date.toLocaleString("pl-PL", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Błąd formatowania daty:", error);
    return dateString;
  }
};

// Funkcja do formatowania wartości liczbowych
const formatNumericValue = (value) => {
  if (value === null || value === undefined) return "Brak danych";
  if (typeof value === "number") return value.toLocaleString("pl-PL");
  return value;
};

// Funkcja do formatowania wartości boolowskich
const formatBooleanValue = (value) => {
  if (value === true) return "Tak";
  if (value === false) return "Nie";
  return "Brak danych";
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const response = await fetch("/api/admin/submissions");
        if (!response.ok) {
          throw new Error("Nie udało się pobrać zgłoszeń");
        }
        const data = await response.json();

        // Konwersja typów dla pól numerycznych
        const processedSubmissions = data.submissions.map((submission) => ({
          ...submission,
          judgeCount: Number(submission.judgeCount),
          judgeSatisfaction: Number(submission.judgeSatisfaction),
          userIncome: Number(submission.userIncome),
          userPotentialIncome: Number(submission.userPotentialIncome),
          userLivingCosts: Number(submission.userLivingCosts),
          userDependantsCosts: Number(submission.userDependantsCosts),
          userAdditionalObligations: Number(
            submission.userAdditionalObligations
          ),
          otherParentIncome: Number(submission.otherParentIncome),
          otherParentPotentialIncome: Number(
            submission.otherParentPotentialIncome
          ),
          otherParentLivingCosts: Number(submission.otherParentLivingCosts),
          otherParentDependantsCosts: Number(
            submission.otherParentDependantsCosts
          ),
          otherParentAdditionalObligations: Number(
            submission.otherParentAdditionalObligations
          ),
          childrenCount: Number(submission.childrenCount),
          children: submission.children.map((child) => ({
            ...child,
            age: Number(child.age),
            userCosts: Number(child.userCosts),
            otherParentCosts: Number(child.otherParentCosts),
            courtRecognizedCosts: child.courtRecognizedCosts
              ? Number(child.courtRecognizedCosts)
              : null,
            alimentAmount: Number(child.alimentAmount),
          })),
        }));

        setSubmissions(processedSubmissions);
        setLoading(false);
      } catch (error) {
        console.error("Błąd:", error);
        setError("Wystąpił błąd podczas pobierania danych: " + error.message);
        setLoading(false);
      }
    }

    fetchSubmissions();
  }, []);

  const exportToExcel = () => {
    try {
      // Przygotowanie danych do eksportu
      const exportData = submissions.map((submission) => {
        // Przygotowanie podstawowych danych
        const basicData = {
          ID: submission.id.substring(0, 8),
          "Data utworzenia": formatDate(submission.createdAt),
        };

        // Dodanie pozostałych pól z odpowiednim formatowaniem
        const formattedData = {};
        Object.entries(submission).forEach(([key, value]) => {
          // Pomijamy pola, które nie chcemy eksportować
          if (["children", "id", "createdAt", "updatedAt"].includes(key)) {
            return;
          }

          // Formatowanie wartości w zależności od typu
          let formattedValue;
          if (typeof value === "boolean") {
            formattedValue = formatBooleanValue(value);
          } else if (typeof value === "number") {
            formattedValue = formatNumericValue(value);
          } else if (key === "courtDate" && value) {
            formattedValue = formatDate(value);
          } else {
            formattedValue = POLISH_VALUES[value] || value;
          }

          const label = POLISH_LABELS[key] || key;
          formattedData[label] = formattedValue;
        });

        return {
          ...basicData,
          ...formattedData,
        };
      });

      // Utworzenie arkusza Excel
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Zgłoszenia");

      // Zapisanie pliku
      XLSX.writeFile(
        workbook,
        `AliMatrix_Zgloszenia_${new Date().toISOString().split("T")[0]}.xlsx`
      );
    } catch (error) {
      console.error("Błąd podczas eksportu do Excel:", error);
      alert("Wystąpił błąd podczas eksportu danych: " + error.message);
    }
  };

  // Funkcja do formatowania wartości dla wyświetlania
  const formatValue = (key, value) => {
    if (value === null || value === undefined || value === "") {
      return "Brak danych";
    }

    if (typeof value === "boolean") {
      return value ? "Tak" : "Nie";
    }

    if (typeof value === "number") {
      // Formatuj wartości pieniężne
      if (
        [
          "userIncome",
          "userPotentialIncome",
          "userLivingCosts",
          "userDependantsCosts",
          "userAdditionalObligations",
          "otherParentIncome",
          "otherParentPotentialIncome",
          "otherParentLivingCosts",
          "otherParentDependantsCosts",
          "otherParentAdditionalObligations",
          "alimentAmount",
          "userCosts",
          "otherParentCosts",
          "courtRecognizedCosts",
        ].includes(key)
      ) {
        return `${value.toLocaleString("pl-PL")} zł`;
      }

      return value.toString();
    }

    if (key === "courtDate") {
      return formatDate(value);
    }

    return POLISH_VALUES[value] || value;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="animate-pulse text-xl text-gray-600">
          Ładowanie danych...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex items-start">
          <AlertCircle size={20} className="flex-shrink-0 mr-2 mt-0.5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Panel administratora</h1>
          <button
            onClick={exportToExcel}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          >
            <Download size={18} className="mr-2" /> Eksport do Excel
          </button>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data wysłania
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liczba dzieci
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Akcje
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submissions.map((submission) => (
                <tr key={submission.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {submission.id.substring(0, 8)}...
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(submission.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.childrenCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => setSelectedSubmission(submission)}
                      className="text-blue-600 hover:text-blue-900 flex items-center"
                    >
                      <Eye size={18} className="mr-1" /> Szczegóły
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modal ze szczegółami */}
        {selectedSubmission && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="bg-gray-100 p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-xl font-bold text-gray-800">
                  Szczegóły zgłoszenia
                </h2>
                <button
                  onClick={() => setSelectedSubmission(null)}
                  className="text-gray-600 hover:text-gray-900 transition"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Sekcja danych użytkownika */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                      Dane podstawowe
                    </h3>
                    {Object.entries(selectedSubmission)
                      .filter(
                        ([key, value]) =>
                          typeof value !== "object" &&
                          key !== "id" &&
                          key !== "createdAt" &&
                          key !== "updatedAt" &&
                          key !== "children"
                      )
                      .map(([key, value]) => (
                        <div key={key} className="mb-2">
                          <span className="text-gray-600 font-medium">
                            {POLISH_LABELS[key] || key}:
                          </span>
                          <span className="ml-2 text-gray-800">
                            {formatValue(key, value)}
                          </span>
                        </div>
                      ))}
                  </div>

                  {/* Sekcja dzieci */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                      Dane dzieci
                    </h3>
                    {selectedSubmission.children &&
                    selectedSubmission.children.length > 0 ? (
                      selectedSubmission.children.map((child, index) => (
                        <div
                          key={child.id}
                          className="bg-gray-50 p-4 rounded-lg mb-4"
                        >
                          <h4 className="font-medium text-gray-700 mb-2">
                            Dziecko {index + 1}
                          </h4>
                          {Object.entries(child)
                            .filter(
                              ([key]) =>
                                key !== "id" && key !== "formSubmissionId"
                            )
                            .map(([key, value]) => (
                              <div key={key} className="mb-1">
                                <span className="text-gray-600 text-sm">
                                  {POLISH_LABELS[key] || key}:
                                </span>
                                <span className="ml-2 text-gray-800 text-sm">
                                  {formatValue(key, value)}
                                </span>
                              </div>
                            ))}
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500">Brak danych o dzieciach</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
