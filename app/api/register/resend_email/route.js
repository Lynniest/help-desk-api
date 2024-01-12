// pages/api/send_verification_email.js
"use server";
import {NextResponse} from "next/server";

import { sendVerificationEmail } from '@/app/lib/send_mail';
export async function POST(request) {
  try{
      const body = await request.json()
      const { email, id } = body;
      // console.log(body)
      await sendVerificationEmail(email, id);
      return NextResponse.json("Email Sent");
  }
  catch(error){
      return NextResponse.json({error: {message: "Page Not Found", details: error}}, { status: 404 })
  }

  
}