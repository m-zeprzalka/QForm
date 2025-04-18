import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const count = await prisma.formSubmission.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("Błąd podczas liczenia zgłoszeń:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas liczenia zgłoszeń" },
      { status: 500 }
    );
  }
}
