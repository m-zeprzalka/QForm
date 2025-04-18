import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // W produkcyjnej wersji należy tutaj dodać uwierzytelnianie

    // Rozszerzone pobieranie danych, aby złączyć ten endpoint z /api/admin/submissions
    const submissions = await prisma.formSubmission.findMany({
      include: {
        children: true, // Dołączamy również dane o dzieciach
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      {
        submissions,
        total: submissions.length,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd podczas pobierania zgłoszeń:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas pobierania zgłoszeń" },
      { status: 500 }
    );
  }
}
