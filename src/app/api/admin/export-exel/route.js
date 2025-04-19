// src/app/api/admin/export-excel/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

// Mapowanie polskich nazw pól
const POLISH_LABELS = {
  // Dane podstawowe
  firstName: "Imię",
  lastName: "Nazwisko",
  email: "Email",
  phone: "Telefon",

  // Dane użytkownika
  gender: "Płeć",
  ageRange: "Przedział wiekowy",
  voivodeship: "Województwo",
  residenceType: "Typ miejscowości",

  // Dane drugiego rodzica
  otherParentGender: "Płeć drugiego rodzica",
  otherParentAgeRange: "Przedział wiekowy drugiego rodzica",
  otherParentVoivodeship: "Województwo drugiego rodzica",
  otherParentResidenceType: "Typ miejscowości drugiego rodzica",

  // Stan cywilny
  maritalStatus: "Stan cywilny",
  divorceInitiator: "Inicjator rozwodu",
  faultClaim: "Roszczenie winy",

  // Alimenty
  alimentBasis: "Podstawa alimentów",
  alimentBasisOther: "Inna podstawa alimentów",

  // Sąd
  courtDate: "Data postanowienia",
  courtType: "Rodzaj sądu",
  courtLocation: "Miejscowość sądu",
  judgeCount: "Liczba sędziów",
  judgeGender: "Płeć sędziego",
  judgeInitials: "Inicjały sędziego",
  judgeSatisfaction: "Satysfakcja z wyroku",

  // Dochody i koszty
  userIncome: "Dochód użytkownika",
  userPotentialIncome: "Potencjalny dochód użytkownika",
  userLivingCosts: "Koszty utrzymania użytkownika",
  userDependantsCosts: "Koszty osób na utrzymaniu użytkownika",
  userAdditionalObligations: "Dodatkowe zobowiązania użytkownika",

  otherParentIncome: "Dochód drugiego rodzica",
  otherParentPotentialIncome: "Potencjalny dochód drugiego rodzica",
  otherParentLivingCosts: "Koszty utrzymania drugiego rodzica",
  otherParentDependantsCosts: "Koszty osób na utrzymaniu drugiego rodzica",
  otherParentAdditionalObligations: "Dodatkowe zobowiązania drugiego rodzica",

  // Dzieci
  childrenCount: "Liczba dzieci",

  // Zgody
  dataProcessingConsent: "Zgoda na przetwarzanie danych",
  communicationConsent: "Zgoda na komunikację",
  agreeToTerms: "Zgoda na regulamin",

  // Dane dziecka
  childAge: "Wiek dziecka",
  childIndex: "Numer dziecka",
  attendsEducation: "Uczęszcza do placówki edukacyjnej",
  educationType: "Typ placówki edukacyjnej",
  userCosts: "Koszty ponoszone przez użytkownika",
  otherParentCosts: "Koszty ponoszone przez drugiego rodzica",
  courtRecognizedCosts: "Koszty uznane przez sąd",
  alimentAmount: "Kwota alimentów",
  hasFamilyPension: "Renta rodzinna",
  hasCareTaking: "Świadczenie pielęgnacyjne",
  hasOtherSources: "Inne źródła utrzymania",
  otherSourcesDescription: "Opis innych źródeł",
  careType: "Sposób sprawowania pieczy",

  // Harmonogram opieki
  cycleType: "Typ cyklu opieki",
  weekNumber: "Numer tygodnia",
  dayOfWeek: "Dzień tygodnia",
  morningHours: "Godziny poranku",
  educationalHours: "Godziny w placówce edukacyjnej",
  afternoonHours: "Godziny po placówce",
  sleepAtUser: "Sen u wypełniającego",
  sleepAtOtherParent: "Sen u drugiego rodzica",
  hoursWithUser: "Godziny z wypełniającym",
  hoursWithOtherParent: "Godziny z drugim rodzicem",
  hoursAtSchool: "Godziny w placówce edukacyjnej",
};

// Mapowanie polskich wartości
const POLISH_VALUES = {
  // Płeć
  male: "Mężczyzna",
  female: "Kobieta",

  // Przedziały wiekowe
  below_25: "Poniżej 25 lat",
  "25_34": "25-34 lat",
  "35_44": "35-44 lat",
  "45_54": "45-54 lat",
  "55_plus": "55+ lat",

  // Typ miejscowości
  village: "Wieś",
  small_city: "Miasto do 50 tys. mieszkańców",
  medium_city: "Miasto 50-200 tys. mieszkańców",
  large_city: "Miasto powyżej 200 tys. mieszkańców",

  // Stan cywilny
  divorce_no_fault: "Rozwód bez orzeczenia o winie",
  divorce_with_fault: "Rozwód z orzeczeniem o winie",
  in_divorce_proceedings: "W trakcie postępowania rozwodowego",
  separation: "W separacji",
  marriage: "Małżeństwo",
  other: "Inne",

  // Inicjator rozwodu
  self: "Użytkownik",
  other_parent: "Drugi rodzic",

  // Podstawa alimentów
  court_order: "Postanowienie zabezpieczające",
  divorce_decree: "Wyrok rozwodowy",
  parental_agreement: "Porozumienie rodzicielskie",

  // Rodzaj sądu
  district: "Sąd Rejonowy",
  regional: "Sąd Okręgowy",

  // Typ placówki edukacyjnej
  nursery: "Żłobek",
  kindergarten: "Przedszkole",
  primary_school: "Szkoła podstawowa",
  secondary_school: "Szkoła ponadpodstawowa",

  // Sposób sprawowania pieczy
  shared_equally: "Opieka naprzemienna (50/50)",
  custom: "Inna",

  // Typ cyklu opieki
  weekly: "Co tydzień",
  biweekly: "Co 2 tygodnie",
  monthly: "Co 4 tygodnie",
  no_pattern: "Brak stałego schematu",

  // Dni tygodnia
  monday: "Poniedziałek",
  tuesday: "Wtorek",
  wednesday: "Środa",
  thursday: "Czwartek",
  friday: "Piątek",
  saturday: "Sobota",
  sunday: "Niedziela",
};

// Funkcja do formatowania wartości dla Excela
function formatValue(key, value) {
  if (value === null || value === undefined) {
    return "";
  }

  // Formatowanie dat
  if (key === "courtDate" && value) {
    try {
      const date = new Date(value);
      return date.toLocaleDateString("pl-PL");
    } catch (e) {
      return value;
    }
  }

  // Formatowanie wartości boolean
  if (typeof value === "boolean") {
    return value ? "Tak" : "Nie";
  }

  // Formatowanie wartości liczbowych związanych z pieniędzmi
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
    ].includes(key) &&
    typeof value === "number"
  ) {
    return value.toFixed(2) + " zł";
  }

  // Przekształcenie wartości z mapowania
  return POLISH_VALUES[value] || value;
}

// Główna funkcja do eksportu danych
export async function GET() {
  try {
    // Pobieranie wszystkich formularzy z danymi dzieci i harmonogramami opieki
    const submissions = await prisma.formSubmission.findMany({
      include: {
        children: {
          include: {
            careSchedules: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Przygotowanie danych do arkuszy Excel
    const mainWorksheetData = [];
    const childrenWorksheetData = [];
    const careSchedulesWorksheetData = [];

    // Przetwarzanie każdego formularza
    submissions.forEach((submission) => {
      // Dane podstawowe formularza
      const mainData = {
        ID: submission.id,
        "Data utworzenia": new Date(submission.createdAt).toLocaleString(
          "pl-PL"
        ),
      };

      // Dodanie pozostałych pól formularza
      Object.entries(submission).forEach(([key, value]) => {
        if (!["id", "createdAt", "updatedAt", "children"].includes(key)) {
          const label = POLISH_LABELS[key] || key;
          mainData[label] = formatValue(key, value);
        }
      });

      mainWorksheetData.push(mainData);

      // Przetwarzanie danych dzieci
      if (submission.children && submission.children.length > 0) {
        submission.children.forEach((child, index) => {
          const childData = {
            "ID formularza": submission.id,
            "ID dziecka": child.id,
            "Numer dziecka": index + 1,
          };

          // Dodanie danych dziecka
          Object.entries(child).forEach(([key, value]) => {
            if (!["id", "formSubmissionId", "careSchedules"].includes(key)) {
              const label = POLISH_LABELS[key] || key;
              childData[label] = formatValue(key, value);
            }
          });

          childrenWorksheetData.push(childData);

          // Przetwarzanie harmonogramów opieki
          if (child.careSchedules && child.careSchedules.length > 0) {
            child.careSchedules.forEach((schedule) => {
              const scheduleData = {
                "ID dziecka": child.id,
                "Numer dziecka": index + 1,
                "Wiek dziecka": child.age,
              };

              // Dodanie danych harmonogramu
              Object.entries(schedule).forEach(([key, value]) => {
                if (!["id", "childId"].includes(key)) {
                  const label = POLISH_LABELS[key] || key;
                  scheduleData[label] = formatValue(key, value);
                }
              });

              careSchedulesWorksheetData.push(scheduleData);
            });
          }
        });
      }
    });

    // Utworzenie workbooka
    const workbook = XLSX.utils.book_new();

    // Dodanie arkusza z danymi podstawowymi
    const mainWorksheet = XLSX.utils.json_to_sheet(mainWorksheetData);
    XLSX.utils.book_append_sheet(workbook, mainWorksheet, "Formularze");

    // Dodanie arkusza z danymi dzieci
    const childrenWorksheet = XLSX.utils.json_to_sheet(childrenWorksheetData);
    XLSX.utils.book_append_sheet(workbook, childrenWorksheet, "Dzieci");

    // Dodanie arkusza z harmonogramami opieki
    const careSchedulesWorksheet = XLSX.utils.json_to_sheet(
      careSchedulesWorksheetData
    );
    XLSX.utils.book_append_sheet(
      workbook,
      careSchedulesWorksheet,
      "Harmonogramy opieki"
    );

    // Konwersja workbooka do bufora
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Zwrócenie pliku Excel jako odpowiedzi
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="AliMatrix_Export_${
          new Date().toISOString().split("T")[0]
        }.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Błąd podczas eksportu danych:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas eksportu danych: " + error.message },
      { status: 500 }
    );
  }
}
