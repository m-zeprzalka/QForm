// src/app/api/admin/export-excel/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as XLSX from "xlsx";

const prisma = new PrismaClient();

// Funkcja do formatowania wartości dla Excela
function formatValue(value) {
  if (value === null || value === undefined) return "";
  if (typeof value === "boolean") return value ? "Tak" : "Nie";
  if (typeof value === "number") return value.toString();
  if (value instanceof Date) return value.toLocaleDateString("pl-PL");
  return String(value);
}

export async function GET() {
  try {
    // Pobierz dane formularzy
    const submissions = await prisma.formSubmission.findMany({
      include: {
        children: {
          include: {
            careSchedules: true,
          },
        },
      },
    });

    // Przygotuj dane do arkuszy Excel
    const formData = submissions.map((form) => {
      // Przygotuj podstawowe dane formularza
      const baseData = {
        ID: form.id,
        Data_utworzenia: formatValue(form.createdAt),
        Imię: form.firstName,
        Nazwisko: form.lastName,
        Email: form.email,
        Telefon: form.phone,
        Płeć: form.gender,
        Wiek: form.ageRange,
        Województwo: form.voivodeship,
        "Miejsce zamieszkania": form.residenceType,
        "Płeć drugiego rodzica": form.otherParentGender,
        "Wiek drugiego rodzica": form.otherParentAgeRange,
        "Województwo drugiego rodzica": form.otherParentVoivodeship,
        "Miejsce zamieszkania drugiego rodzica": form.otherParentResidenceType,
        "Stan cywilny": form.maritalStatus,
        "Podstawa alimentów": form.alimentBasis,
        "Dochód użytkownika": form.userIncome,
        "Dochód drugiego rodzica": form.otherParentIncome,
        "Liczba dzieci": form.childrenCount,
      };

      return baseData;
    });

    // Przygotuj dane o dzieciach
    const childrenData = [];
    submissions.forEach((form) => {
      if (!form.children) return;
      form.children.forEach((child) => {
        childrenData.push({
          FormularzID: form.id,
          DzieckoID: child.id,
          Wiek: child.age,
          "Uczęszcza do placówki": formatValue(child.attendsEducation),
          "Typ placówki": child.educationType || "",
          "Kwota alimentów": child.alimentAmount,
          "Koszty użytkownika": child.userCosts,
          "Koszty drugiego rodzica": child.otherParentCosts,
          "Typ opieki": child.careType,
        });
      });
    });

    // Przygotuj dane o harmonogramach opieki
    const scheduleData = [];
    submissions.forEach((form) => {
      if (!form.children) return;
      form.children.forEach((child) => {
        if (!child.careSchedules) return;
        child.careSchedules.forEach((schedule) => {
          try {
            // Parse scheduleData from JSONB field
            const scheduleDetails = schedule.scheduleData || {};

            scheduleData.push({
              DzieckoID: child.id,
              "Typ cyklu": schedule.cycleType,
              "Dzień tygodnia": scheduleDetails.dayOfWeek || "",
              "Numer tygodnia": scheduleDetails.weekNumber || "",
              "Godziny poranku": scheduleDetails.morningHours || "",
              "Godziny w placówce": scheduleDetails.educationalHours || "",
              "Godziny po placówce": scheduleDetails.afternoonHours || "",
              "Sen u wypełniającego": scheduleDetails.sleepAtUser || "",
              "Sen u drugiego rodzica":
                scheduleDetails.sleepAtOtherParent || "",
              "Godziny z wypełniającym": scheduleDetails.hoursWithUser || "",
              "Godziny z drugim rodzicem":
                scheduleDetails.hoursWithOtherParent || "",
              "Godziny w placówce": scheduleDetails.hoursAtSchool || "",
            });
          } catch (err) {
            console.error("Błąd podczas przetwarzania harmonogramu:", err);
          }
        });
      });
    });

    // Utwórz workbook Excel
    const wb = XLSX.utils.book_new();

    // Dodaj arkusz formularzy
    const formSheet = XLSX.utils.json_to_sheet(formData);
    XLSX.utils.book_append_sheet(wb, formSheet, "Formularze");

    // Dodaj arkusz dzieci, jeśli są dane
    if (childrenData.length > 0) {
      const childSheet = XLSX.utils.json_to_sheet(childrenData);
      XLSX.utils.book_append_sheet(wb, childSheet, "Dzieci");
    }

    // Dodaj arkusz harmonogramów, jeśli są dane
    if (scheduleData.length > 0) {
      const scheduleSheet = XLSX.utils.json_to_sheet(scheduleData);
      XLSX.utils.book_append_sheet(wb, scheduleSheet, "Harmonogramy");
    }

    // Wygeneruj bufor Excel
    const buf = XLSX.write(wb, { type: "buffer", bookType: "xlsx" });

    // Zwróć plik jako odpowiedź
    return new NextResponse(buf, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="AliMatrix_Export_${
          new Date().toISOString().split("T")[0]
        }.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Błąd podczas eksportu:", error);
    return NextResponse.json(
      {
        error:
          "Wystąpił błąd podczas generowania pliku Excel: " + error.message,
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
