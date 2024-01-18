import { scheduleTokenUpdates, createUser } from "@/app/lib/functions";
import { userSchema } from "@/app/lib/schema_validation";
const { sendVerificationEmail } = require("@/app/lib/send_mail");
import { NextResponse } from "next/server";
import { ZodError } from "zod";


export async function POST(request) {

  const body = await request.json();
  try {
        const valid = await ticketSchema.parseAsync(body);
    } catch (error) {
  return NextResponse.json({ error: { message: 'Invalid request body', details: error.issues.map(e=>e.message) }}, { status: 400 });
    }

  try {
    // console.log(valid);

    const data = {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      phoneNo: body.phoneNo,
      password: body.password,
      userType: body.userType,
      emailVerified: false,
    };

    const newUser = await createUser(data);
    await sendVerificationEmail(newUser.email, newUser.id);
    await scheduleTokenUpdates(newUser.id);

    // return NextResponse.redirect(`${process.env.HOST_URL}/register/verify_email/${newUser.email}/${newUser.id}`);
    return NextResponse.json({ message: "Verification email sent successfully.", user: newUser }, { status: 200 });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: { message: "Failed to add user details.", details: error } }, { status: 400 });
    }
    return new Response(JSON.stringify({ error: { message: "Failed to send verification email.", details: error } }), { status: 400 });
  }
}
