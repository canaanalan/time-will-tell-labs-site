import { NextResponse } from "next/server";

const recipientEmail = "hello@timewilltelllabs.com";

type CommunityRequest = {
  name?: unknown;
  email?: unknown;
  focus?: unknown;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function isEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail =
    process.env.RESEND_FROM_EMAIL ?? "Time Will Tell Labs <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json(
      { error: "Email sending is not configured yet. Add RESEND_API_KEY." },
      { status: 503 },
    );
  }

  let payload: CommunityRequest;

  try {
    payload = (await request.json()) as CommunityRequest;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const focus = clean(payload.focus);

  if (!name || !email || !focus) {
    return NextResponse.json(
      { error: "Please fill out every field before sending." },
      { status: 400 },
    );
  }

  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const body = [
    "QA Community request",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Role or focus: ${focus}`,
  ].join("\n");

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: recipientEmail,
      reply_to: email,
      subject: "Time Will Tell Labs: QA Community",
      text: body,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { error: "The request could not be sent. Please try email instead." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
