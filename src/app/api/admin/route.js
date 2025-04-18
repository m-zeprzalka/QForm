import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // W produkcyjnej wersji należy tutaj dodać uwierzytelnianie

    const submissions = await prisma.formSubmission.findMany({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        createdAt: true,
        agreeToTerms: true,
        dataProcessingConsent: true,
      },
    });

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error("Błąd podczas pobierania zgłoszeń:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas pobierania zgłoszeń" },
      { status: 500 }
    );
  }
}
