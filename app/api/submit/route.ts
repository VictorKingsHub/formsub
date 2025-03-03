// app/api/submit/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log("Received data:", data);
    console.log(data);

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER, // Use environment variables!
        pass: process.env.GMAIL_PASS, // Use environment variables!
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER, // Use environment variables!
      to: "kingvic2553@gmail.com",
      subject: "New Form Submission",
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Message: ${data.message}
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: "Email sent and data received successfully!",
    });
  } catch (error) {
    console.error("Error processing data or sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
