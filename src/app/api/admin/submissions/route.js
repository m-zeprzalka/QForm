// src/app/api/admin/submissions/route.js
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const submissions = await prisma.formSubmission.findMany({
      include: {
        children: true, // Dołączamy również dane o dzieciach
      },
      orderBy: {
        createdAt: "desc", // Sortowanie od najnowszych
      },
    });

    return NextResponse.json({
      submissions,
      total: submissions.length,
    });
  } catch (error) {
    console.error("Błąd pobierania zgłoszeń:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać zgłoszeń" },
      { status: 500 }
    );
  }
}
