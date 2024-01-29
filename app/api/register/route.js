import { scheduleTokenUpdates, createUser } from "@/app/lib/functions";
import { hashPassword } from "@/app/lib/passwordFun";
import { userSchema } from "@/app/lib/schema_validation";
import { sendEmail } from "@/app/lib/send_mail";
import { NextResponse } from "next/server";
import { ZodError } from "zod";


export async function POST(request) {

  const body = await request.json();

  try {
    const valid = await userSchema.parseAsync(body);
    // console.log(valid);

    const data = {
      firstName: body.firstName,
      lastName: body.lastName,
      username: body.username,
      email: body.email,
      phoneNo: body.phoneNo,
      password: await hashPassword(body.password),
      userType: body.userType ? body.userType : "User",
      emailVerified: false,
    };

    const newUser = await createUser(data);
    await sendEmail(newUser.email, newUser.id, "verification");
    const {password, ...userWithoutPassword} = newUser;

    // return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/register/verify_email/${newUser.email}/${newUser.id}`);
    return NextResponse.json({ message: "Verification email sent successfully.", user: userWithoutPassword}, { status: 200 });

  } catch (error) {
    console.log(error)
    if (error instanceof ZodError) {
      return NextResponse.json({ error: { message: "Failed to add user details.", details: error } }, { status: 400 });
    }
    return new Response(JSON.stringify({ error: { message: "Failed to send verification email.", details: error } }), { status: 400 });
  }
}
