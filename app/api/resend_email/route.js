// pages/api/send_verification_email.js
"use server";
import {NextResponse} from "next/server";

import { sendEmail } from '@/app/lib/send_mail';
export async function POST(request) {
  try{
      const body = await request.json()
      const { email, id } = body;
      // console.log(body)
      await sendEmail(email, id, "verification");
      return NextResponse.json({message: "Email Sent"}, {status: 200});
  }
  catch(error){
      return NextResponse.json({error: {message: "Page Not Found", details: error}}, { status: 404 })
  }

  
}