import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Liczenie wszystkich zgłoszeń
    const count = await prisma.formSubmission.count();

    return NextResponse.json(
      {
        count,
        remainingFree: Math.max(0, 300 - count),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd podczas liczenia zgłoszeń:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas liczenia zgłoszeń: " + error.message },
      { status: 500 }
    );
  }
}
