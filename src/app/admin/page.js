"use client";

import { useState, useEffect } from "react";
import {
  Download,
  Eye,
  AlertCircle,
  FileSpreadsheet,
  Users,
  Database,
} from "lucide-react";

// Mapowanie polskich nazw i wartości
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
  judgeInitials: "Inicjały sędziego",
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
  divorce_no_fault: "Rozwód bez orzeczenia o winie",
  divorce_with_fault: "Rozwód z orzeczeniem o winie",
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
  weekly: "Co tydzień",
  biweekly: "Co 2 tygodnie",
  monthly: "Co 4 tygodnie",
  no_pattern: "Brak stałego schematu",
};

// Funkcja do formatowania wartości do wyświetlenia
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

  if (key === "courtDate" && value) {
    try {
      const date = new Date(value);
      return date.toLocaleDateString("pl-PL");
    } catch (e) {
      return value;
    }
  }

  return POLISH_VALUES[value] || value;
};

// Komponent statystyk
const StatCard = ({ icon, title, value, description, color }) => {
  return (
    <div
      className={`bg-${color}-50 border border-${color}-100 rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-start">
        <div className={`p-3 bg-${color}-100 rounded-lg mr-4`}>{icon}</div>
        <div>
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className={`text-2xl font-bold text-${color}-600 mb-1`}>{value}</p>
          {description && (
            <p className="text-xs text-gray-500">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [exportLoading, setExportLoading] = useState(false);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        setLoading(true);
        const response = await fetch("/api/admin/submissions");
        if (!response.ok) {
          throw new Error("Nie udało się pobrać zgłoszeń");
        }
        const data = await response.json();

        // Konwersja typów dla pól numerycznych
        const processedSubmissions = data.submissions.map((submission) => ({
          ...submission,
          judgeCount: Number(submission.judgeCount || 0),
          judgeSatisfaction: Number(submission.judgeSatisfaction || 0),
          userIncome: Number(submission.userIncome || 0),
          userPotentialIncome: Number(submission.userPotentialIncome || 0),
          userLivingCosts: Number(submission.userLivingCosts || 0),
          userDependantsCosts: Number(submission.userDependantsCosts || 0),
          userAdditionalObligations: Number(
            submission.userAdditionalObligations || 0
          ),
          otherParentIncome: Number(submission.otherParentIncome || 0),
          otherParentPotentialIncome: Number(
            submission.otherParentPotentialIncome || 0
          ),
          otherParentLivingCosts: Number(
            submission.otherParentLivingCosts || 0
          ),
          otherParentDependantsCosts: Number(
            submission.otherParentDependantsCosts || 0
          ),
          otherParentAdditionalObligations: Number(
            submission.otherParentAdditionalObligations || 0
          ),
          childrenCount: Number(submission.childrenCount || 0),
          children:
            submission.children?.map((child) => ({
              ...child,
              age: Number(child.age || 0),
              userCosts: Number(child.userCosts || 0),
              otherParentCosts: Number(child.otherParentCosts || 0),
              courtRecognizedCosts: child.courtRecognizedCosts
                ? Number(child.courtRecognizedCosts)
                : null,
              alimentAmount: Number(child.alimentAmount || 0),
            })) || [],
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

  // Funkcja do eksportu danych do Excela
  const exportToExcel = async () => {
    try {
      setExportLoading(true);

      // Pobieranie pliku Excel bezpośrednio z API
      const response = await fetch("/api/admin/export-excel");

      if (!response.ok) {
        throw new Error("Nie udało się pobrać pliku Excel");
      }

      // Konwersja odpowiedzi na blob
      const blob = await response.blob();

      // Tworzenie URL dla pliku
      const url = URL.createObjectURL(blob);

      // Tworzenie linku do pobrania pliku
      const a = document.createElement("a");
      a.href = url;
      a.download = `AliMatrix_Export_${
        new Date().toISOString().split("T")[0]
      }.xlsx`;

      // Symulacja kliknięcia w link
      document.body.appendChild(a);
      a.click();

      // Czyszczenie
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportLoading(false);
    } catch (error) {
      console.error("Błąd podczas eksportu do Excel:", error);
      alert("Wystąpił błąd podczas eksportu danych: " + error.message);
      setExportLoading(false);
    }
  };

  // Obliczenia dla statystyk
  const totalSubmissions = submissions.length;
  const totalChildren = submissions.reduce(
    (sum, submission) => sum + (submission.childrenCount || 0),
    0
  );
  const averageAlimentAmount =
    totalChildren > 0
      ? submissions.reduce((sum, submission) => {
          const childrenSum =
            submission.children?.reduce(
              (childSum, child) => childSum + (child.alimentAmount || 0),
              0
            ) || 0;
          return sum + childrenSum;
        }, 0) / totalChildren
      : 0;

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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Panel administratora AliMatrix
            </h1>
            <p className="text-gray-600">Zarządzaj danymi i generuj raporty</p>
          </div>

          <button
            onClick={exportToExcel}
            disabled={exportLoading}
            className={`flex items-center ${
              exportLoading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-green-500 hover:bg-green-600"
            } text-white px-4 py-2 rounded transition`}
          >
            {exportLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                Eksportowanie...
              </>
            ) : (
              <>
                <FileSpreadsheet size={18} className="mr-2" /> Eksport do Excel
              </>
            )}
          </button>
        </div>

        {/* Statystyki */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={<Database size={24} className="text-blue-500" />}
            title="Liczba zgłoszeń"
            value={totalSubmissions}
            description="Łączna liczba wypełnionych formularzy"
            color="blue"
          />

          <StatCard
            icon={<Users size={24} className="text-green-500" />}
            title="Dzieci w systemie"
            value={totalChildren}
            description="Łączna liczba dzieci we wszystkich zgłoszeniach"
            color="green"
          />

          <StatCard
            icon={<Download size={24} className="text-purple-500" />}
            title="Średnia alimentów"
            value={`${Math.round(averageAlimentAmount).toLocaleString(
              "pl-PL"
            )} zł`}
            description="Średnia kwota alimentów na dziecko"
            color="purple"
          />
        </div>

        {/* Tabela zgłoszeń */}
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
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liczba dzieci
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Podstawa alimentów
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
                    {new Date(submission.createdAt).toLocaleDateString("pl-PL")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {submission.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                    {submission.childrenCount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {POLISH_VALUES[submission.alimentBasis] ||
                      submission.alimentBasis}
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
            <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
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

              <div className="p-6 space-y-8">
                {/* Podstawowe informacje */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                    Dane podstawowe
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Dane osobowe</p>
                      <div className="space-y-1">
                        {["firstName", "lastName", "email", "phone"].map(
                          (key) => (
                            <div key={key} className="flex justify-between">
                              <span className="text-gray-600 text-sm">
                                {POLISH_LABELS[key]}:
                              </span>
                              <span className="text-gray-800 text-sm font-medium">
                                {selectedSubmission[key]}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Alimenty</p>
                      <div className="space-y-1">
                        {[
                          "alimentBasis",
                          "alimentBasisOther",
                          "childrenCount",
                        ].map((key) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                              {POLISH_LABELS[key]}:
                            </span>
                            <span className="text-gray-800 text-sm font-medium">
                              {formatValue(key, selectedSubmission[key])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <p className="text-sm text-gray-500">Sąd</p>
                      <div className="space-y-1">
                        {[
                          "courtType",
                          "courtLocation",
                          "courtDate",
                          "judgeCount",
                          "judgeGender",
                        ].map((key) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                              {POLISH_LABELS[key]}:
                            </span>
                            <span className="text-gray-800 text-sm font-medium">
                              {formatValue(key, selectedSubmission[key])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dane demograficzne */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                    Dane demograficzne
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Wypełniający
                      </h4>
                      <div className="space-y-1">
                        {[
                          "gender",
                          "ageRange",
                          "voivodeship",
                          "residenceType",
                          "maritalStatus",
                        ].map((key) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                              {POLISH_LABELS[key]}:
                            </span>
                            <span className="text-gray-800 text-sm font-medium">
                              {formatValue(key, selectedSubmission[key])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Drugi rodzic
                      </h4>
                      <div className="space-y-1">
                        {[
                          "otherParentGender",
                          "otherParentAgeRange",
                          "otherParentVoivodeship",
                          "otherParentResidenceType",
                        ].map((key) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                              {POLISH_LABELS[key]}:
                            </span>
                            <span className="text-gray-800 text-sm font-medium">
                              {formatValue(key, selectedSubmission[key])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dane finansowe */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                    Sytuacja finansowa
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Wypełniający
                      </h4>
                      <div className="space-y-1">
                        {[
                          "userIncome",
                          "userPotentialIncome",
                          "userLivingCosts",
                          "userDependantsCosts",
                          "userAdditionalObligations",
                        ].map((key) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                              {POLISH_LABELS[key]}:
                            </span>
                            <span className="text-gray-800 text-sm font-medium">
                              {formatValue(key, selectedSubmission[key])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-700 mb-2">
                        Drugi rodzic
                      </h4>
                      <div className="space-y-1">
                        {[
                          "otherParentIncome",
                          "otherParentPotentialIncome",
                          "otherParentLivingCosts",
                          "otherParentDependantsCosts",
                          "otherParentAdditionalObligations",
                        ].map((key) => (
                          <div key={key} className="flex justify-between">
                            <span className="text-gray-600 text-sm">
                              {POLISH_LABELS[key]}:
                            </span>
                            <span className="text-gray-800 text-sm font-medium">
                              {formatValue(key, selectedSubmission[key])}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dane dzieci */}
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                    Dane dzieci ({selectedSubmission.children?.length || 0})
                  </h3>

                  {selectedSubmission.children &&
                  selectedSubmission.children.length > 0 ? (
                    <div className="space-y-6">
                      {selectedSubmission.children.map((child, index) => (
                        <div
                          key={child.id}
                          className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                        >
                          <h4 className="font-medium text-gray-700 mb-4 pb-2 border-b">
                            Dziecko {index + 1} ({child.age} lat)
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h5 className="text-sm font-medium text-gray-600 mb-2">
                                Podstawowe informacje
                              </h5>
                              <div className="space-y-1">
                                {[
                                  "age",
                                  "attendsEducation",
                                  "educationType",
                                  "careType",
                                ].map((key) => (
                                  <div
                                    key={key}
                                    className="flex justify-between"
                                  >
                                    <span className="text-gray-600 text-sm">
                                      {POLISH_LABELS[key]}:
                                    </span>
                                    <span className="text-gray-800 text-sm font-medium">
                                      {formatValue(key, child[key])}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium text-gray-600 mb-2">
                                Koszty i alimenty
                              </h5>
                              <div className="space-y-1">
                                {[
                                  "alimentAmount",
                                  "userCosts",
                                  "otherParentCosts",
                                  "courtRecognizedCosts",
                                ].map((key) => (
                                  <div
                                    key={key}
                                    className="flex justify-between"
                                  >
                                    <span className="text-gray-600 text-sm">
                                      {POLISH_LABELS[key]}:
                                    </span>
                                    <span className="text-gray-800 text-sm font-medium">
                                      {formatValue(key, child[key])}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium text-gray-600 mb-2">
                              Dodatkowe źródła utrzymania
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {child.hasFamilyPension && (
                                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                                  Renta rodzinna
                                </span>
                              )}
                              {child.hasCareTaking && (
                                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                  Świadczenie pielęgnacyjne
                                </span>
                              )}
                              {child.hasOtherSources && (
                                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded">
                                  Inne:{" "}
                                  {child.otherSourcesDescription ||
                                    "brak opisu"}
                                </span>
                              )}
                              {!child.hasFamilyPension &&
                                !child.hasCareTaking &&
                                !child.hasOtherSources && (
                                  <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                                    Brak dodatkowych źródeł
                                  </span>
                                )}
                            </div>
                          </div>

                          {/* Harmonogram opieki, jeśli istnieje */}
                          {child.careType === "custom" &&
                            child.careSchedules &&
                            child.careSchedules.length > 0 && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <h5 className="text-sm font-medium text-gray-600 mb-2">
                                  Harmonogram opieki
                                </h5>
                                <div className="overflow-x-auto">
                                  <table className="min-w-full text-xs border-collapse">
                                    <thead>
                                      <tr className="bg-gray-100">
                                        <th className="p-2 border border-gray-300 text-left">
                                          Dzień
                                        </th>
                                        <th className="p-2 border border-gray-300 text-left">
                                          Tydzień
                                        </th>
                                        <th className="p-2 border border-gray-300 text-left">
                                          Poranek
                                        </th>
                                        <th className="p-2 border border-gray-300 text-left">
                                          Placówka
                                        </th>
                                        <th className="p-2 border border-gray-300 text-left">
                                          Po placówce
                                        </th>
                                        <th className="p-2 border border-gray-300 text-left">
                                          Sen - rodzic 1
                                        </th>
                                        <th className="p-2 border border-gray-300 text-left">
                                          Sen - rodzic 2
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {child.careSchedules.map(
                                        (schedule, idx) => (
                                          <tr
                                            key={idx}
                                            className="hover:bg-gray-50"
                                          >
                                            <td className="p-2 border border-gray-300">
                                              {schedule.dayOfWeek === "monday"
                                                ? "Poniedziałek"
                                                : schedule.dayOfWeek ===
                                                  "tuesday"
                                                ? "Wtorek"
                                                : schedule.dayOfWeek ===
                                                  "wednesday"
                                                ? "Środa"
                                                : schedule.dayOfWeek ===
                                                  "thursday"
                                                ? "Czwartek"
                                                : schedule.dayOfWeek ===
                                                  "friday"
                                                ? "Piątek"
                                                : schedule.dayOfWeek ===
                                                  "saturday"
                                                ? "Sobota"
                                                : schedule.dayOfWeek ===
                                                  "sunday"
                                                ? "Niedziela"
                                                : ""}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                              {schedule.weekNumber}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                              {schedule.morningHours || "-"}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                              {schedule.educationalHours || "-"}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                              {schedule.afternoonHours || "-"}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                              {schedule.sleepAtUser || "-"}
                                            </td>
                                            <td className="p-2 border border-gray-300">
                                              {schedule.sleepAtOtherParent ||
                                                "-"}
                                            </td>
                                          </tr>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">Brak danych o dzieciach</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
