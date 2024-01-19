import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma"
import crypto from "crypto";

const p = prisma;

export async function GET(request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({message: "Unauthorized"}, {status: 401})
}
  
  try {
    const users = await prisma.user.updateMany({
      where: {
        emailVerified: true,
      },
      data: {
        userToken: crypto.randomBytes(10).toString('hex'),
      },
    });   
    return NextResponse.json({ message: "Schedule Updated Successfully." }, {status: 200});
    
  } catch (error) {
    return NextResponse.json({ message: "Failed to schedule tokens." }, {status: 400});
  }

  
}