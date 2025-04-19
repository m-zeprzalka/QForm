// src/app/api/submit-alimatrix-form/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Funkcja do hashowania danych
function hashData(data) {
  if (!data) return null;
  const salt = crypto.randomBytes(16).toString("hex");
  return (
    crypto
      .pbkdf2Sync(data.toString(), salt, 1000, 64, "sha512")
      .toString("hex") +
    ":" +
    salt
  );
}

// Bezpieczne parsowanie wartości liczbowych
function safeParseFloat(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

function safeParseInt(value) {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

// Bezpieczne parsowanie dat
function safeParseDateOrNull(dateInput) {
  if (!dateInput) return null;
  try {
    const date = new Date(dateInput);
    return isNaN(date.getTime()) ? null : date;
  } catch (error) {
    console.error("Błąd parsowania daty:", error);
    return null;
  }
}

// Funkcja do przetwarzania danych harmonogramu opieki
function processCareSchedules(careScheduleData, childId) {
  if (!careScheduleData || !Array.isArray(careScheduleData)) return [];

  // Przekształć dane o harmonogramie w format do zapisu
  return careScheduleData.map((schedule) => {
    const hoursWithUser = safeParseFloat(schedule.hoursWithUser || 0);
    const hoursWithOtherParent = safeParseFloat(
      schedule.hoursWithOtherParent || 0
    );
    const hoursAtSchool = safeParseFloat(schedule.hoursAtSchool || 0);

    return {
      childId,
      cycleType: schedule.cycleType || "weekly",
      weekNumber: safeParseInt(schedule.weekNumber || 1),
      dayOfWeek: schedule.dayOfWeek,
      morningHours: schedule.morningHours,
      educationalHours: schedule.educationalHours,
      afternoonHours: schedule.afternoonHours,
      sleepAtUser: schedule.sleepAtUser,
      sleepAtOtherParent: schedule.sleepAtOtherParent,
      hoursWithUser,
      hoursWithOtherParent,
      hoursAtSchool,
    };
  });
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Hashowanie wrażliwych danych
    const hashedEmail = body.email ? hashData(body.email) : null;
    const ipHash = hashData("127.0.0.1"); // W produkcji: request.headers.get('x-forwarded-for') || "127.0.0.1"

    // Dane podstawowe formularza
    const formSubmissionData = {
      firstName: body.firstName || "",
      lastName: body.lastName || "",
      email: body.email || "",
      phone: body.phone || "",

      gender: body.gender || "",
      ageRange: body.ageRange || "",
      voivodeship: body.voivodeship || "",
      residenceType: body.residenceType || "",

      otherParentGender: body.otherParentGender || "",
      otherParentAgeRange: body.otherParentAgeRange || "",
      otherParentVoivodeship: body.otherParentVoivodeship || "",
      otherParentResidenceType: body.otherParentResidenceType || "",

      maritalStatus: body.maritalStatus || "",
      divorceInitiator: body.divorceInitiator || null,
      faultClaim: body.faultClaim === true,

      alimentBasis: body.alimentBasis || "",
      alimentBasisOther: body.alimentBasisOther || "",
      childrenCount: safeParseInt(body.childrenCount) || 1,

      courtDate: safeParseDateOrNull(body.courtDate),
      courtType: body.courtType || null,
      courtLocation: body.courtLocation || null,
      judgeCount: safeParseInt(body.judgeCount) || 1,
      judgeGender: body.judgeGender || null,
      judgeInitials: body.judgeInitials || null,
      judgeSatisfaction: safeParseInt(body.judgeSatisfaction) || 3,

      userIncome: safeParseFloat(body.userIncome),
      userPotentialIncome: safeParseFloat(body.userPotentialIncome),
      userLivingCosts: safeParseFloat(body.userLivingCosts),
      userDependantsCosts: safeParseFloat(body.userDependantsCosts),
      userAdditionalObligations: safeParseFloat(body.userAdditionalObligations),

      otherParentIncome: safeParseFloat(body.otherParentIncome),
      otherParentPotentialIncome: safeParseFloat(
        body.otherParentPotentialIncome
      ),
      otherParentLivingCosts: safeParseFloat(body.otherParentLivingCosts),
      otherParentDependantsCosts: safeParseFloat(
        body.otherParentDependantsCosts
      ),
      otherParentAdditionalObligations: safeParseFloat(
        body.otherParentAdditionalObligations
      ),

      dataProcessingConsent: body.dataProcessingConsent === true,
      communicationConsent: body.communicationConsent === true,
      agreeToTerms: body.agreeToTerms === true,

      ipHash: ipHash,
      hashedEmail: hashedEmail,
    };

    // Zapisanie głównego formularza w bazie danych
    const formSubmission = await prisma.formSubmission.create({
      data: formSubmissionData,
    });

    // Przetwarzanie danych o dzieciach
    if (Array.isArray(body.children) && body.children.length > 0) {
      for (const childData of body.children) {
        // Przygotowanie danych dziecka do zapisu
        const childDataToSave = {
          formSubmissionId: formSubmission.id,
          age: safeParseInt(childData.age),
          attendsEducation: childData.attendsEducation === true,
          educationType: childData.educationType || null,
          userCosts: safeParseFloat(childData.userCosts),
          otherParentCosts: safeParseFloat(childData.otherParentCosts),
          courtRecognizedCosts: safeParseFloat(childData.courtRecognizedCosts),
          alimentAmount: safeParseFloat(childData.alimentAmount),
          hasFamilyPension: childData.hasFamilyPension === true,
          hasCareTaking: childData.hasCareTaking === true,
          hasOtherSources: childData.hasOtherSources === true,
          otherSourcesDescription: childData.otherSourcesDescription || null,
          careType: childData.careType || "shared_equally",
        };

        // Zapisanie dziecka w bazie
        const savedChild = await prisma.child.create({
          data: childDataToSave,
        });

        // Przetwarzanie harmonogramu opieki, jeśli istnieje
        if (
          childData.careType === "custom" &&
          Array.isArray(childData.careSchedules) &&
          childData.careSchedules.length > 0
        ) {
          const scheduleEntries = processCareSchedules(
            childData.careSchedules,
            savedChild.id
          );

          // Zapisanie wszystkich wpisów harmonogramu
          for (const scheduleEntry of scheduleEntries) {
            await prisma.careSchedule.create({
              data: scheduleEntry,
            });
          }
        }
      }
    }

    // Zwrócenie sukcesu
    return NextResponse.json(
      {
        success: true,
        id: formSubmission.id,
        message: "Formularz został pomyślnie zapisany",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Błąd podczas przetwarzania formularza:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Wystąpił błąd podczas przetwarzania formularza: " + error.message,
      },
      { status: 500 }
    );
  }
}
