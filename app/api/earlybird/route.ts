import { NextResponse } from "next/server";
import { appendToGoogleSheet } from "../../lib/googleSheets";

type RequestBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  city?: string;
};

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    const firstName = body.firstName?.trim() || "";
    const lastName = body.lastName?.trim() || "";
    const email = body.email?.trim() || "";
    const phoneNumber = body.phoneNumber?.trim() || "";
    const city = body.city?.trim() || "";

    if (!firstName || !lastName || !email || !phoneNumber || !city) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();

    await appendToGoogleSheet([
      submittedAt,
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      "Website",
    ]);

    return NextResponse.json(
      { message: "Form submitted successfully." },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Earlybird form submission failed:", error);

    const details =
      error instanceof Error ? error.message : "Unknown server error";

    return NextResponse.json(
      {
        error: "Failed to save form data.",
        details,
      },
      { status: 500 }
    );
  }
}