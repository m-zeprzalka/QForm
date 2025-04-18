import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient();

// Funkcja do hashowania danych
function hashData(data) {
  return crypto.createHash("sha256").update(data).digest("hex");
}

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      agreeToTerms,
      dataProcessingConsent,
    } = body;

    // Walidacja
    if (!firstName || !lastName || !email || !phone) {
      return NextResponse.json(
        { message: "Wszystkie pola są wymagane" },
        { status: 400 }
      );
    }

    // Tworzenie pseudonimizowanych danych
    const hashedName = hashData(`${firstName} ${lastName}`);
    const hashedEmail = hashData(email);

    // Pobranie IP użytkownika (w środowisku produkcyjnym)
    // const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    // const ipHash = hashData(ip);

    // Dla uproszczenia w środowisku deweloperskim
    const ipHash = hashData("127.0.0.1");

    // Zapisanie danych w bazie
    const submission = await prisma.formSubmission.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        hashedName,
        hashedEmail,
        agreeToTerms,
        dataProcessingConsent,
        ipHash,
      },
    });

    return NextResponse.json(
      { success: true, id: submission.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Błąd podczas przetwarzania formularza:", error);
    return NextResponse.json(
      { message: "Wystąpił błąd podczas przetwarzania formularza" },
      { status: 500 }
    );
  }
}
