// src/app/api/submit-alimatrix-form/route.js
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

function hashData(data) {
  if (!data) return null;
  return crypto.createHash("sha256").update(data.toString()).digest("hex");
}

function safeParseFloat(value) {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
}

function safeParseInt(value) {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? 0 : parsed;
}

function safeParseDateOrNull(dateInput) {
  if (!dateInput) return null;
  const date = new Date(dateInput);
  return date.getFullYear() > 1 && date.getFullYear() < 9999 ? date : null;
}

export async function POST(request) {
  try {
    const body = await request.json();

    const hashedEmail = body.email ? hashData(body.email) : null;
    const ipHash = hashData("127.0.0.1");

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
      // cd. route.js
      hashedEmail: hashedEmail,
    };

    const formSubmission = await prisma.formSubmission.create({
      data: formSubmissionData,
    });

    if (Array.isArray(body.children) && body.children.length > 0) {
      for (const childData of body.children) {
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

        const savedChild = await prisma.child.create({
          data: childDataToSave,
        });

        if (childData.careType === "custom" && childData.careSchedule) {
          await prisma.careSchedule.create({
            data: {
              childId: savedChild.id,
              cycleType: childData.careSchedule.cycleType || "weekly",
              scheduleData: childData.careSchedule.scheduleData || {},
            },
          });
        }
      }
    }

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
