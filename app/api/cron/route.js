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
    users && users.map(async(user)=>{
      await updateUserToken(user.id);
    })
    return NextResponse.json({ message: "Schedule Updated Successfully." }, {status: 200});
    
  } catch (error) {
    if (error.code === 'P2002') {
      console.log('Unique constraint violation: ', error.meta.target);
    }
    return NextResponse.json({ message: "Failed to schedule tokens.", details: error}, {status: 400});
  }

  
}