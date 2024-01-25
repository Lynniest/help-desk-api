import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma"
import crypto from "crypto";
import { updateUserToken } from '@/app/lib/functions';

const p = prisma;

export async function GET(request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({message: "Unauthorized"}, {status: 401})
}
  
  try {
    const users = await prisma.user.findMany({
      where: {
        emailVerified: true,
      },
    });
    // console.log(users)
  if(users) { 
    await Promise.all(users.map(async (user) => {
        await updateUserToken(user.id);
    }));
    
}
  return NextResponse.json({ message: "Schedule Updated Successfully." }, {status: 200});
    
  } catch (error) {
    return NextResponse.json({ message: "Failed to schedule tokens.", details: error}, {status: 400});
  }

  
}