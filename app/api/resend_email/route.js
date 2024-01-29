"use server";
import {NextResponse} from "next/server";

import { sendEmail } from '@/app/lib/send_mail';
export async function POST(request) {
  // console.log(request)
  try{
      const body = await request.json()
      const { email, id, type } = body;
      // console.log(body)
      await sendEmail(email, id, type);
      return NextResponse.json({message: "Email Sent"}, {status: 200});
  }
  catch(error){
    console.log(error)
      return NextResponse.json({error: {message: "Page Not Found", details: error}}, { status: 404 })
  }

  
}