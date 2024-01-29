import { NextResponse } from 'next/server';
import prisma from "@/app/lib/prisma"
import crypto from "crypto";
import { updateUserToken } from '@/app/lib/functions';

export async function GET(request) {
  if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  return NextResponse.json({message: "Unauthorized"}, {status: 401})
}
  
  try {
    const users = await prisma.user.findMany({
      where: {
        emailVerified: false,
      },
    });
    console.log(users)
  if(users) { 
    await Promise.all(users.map(async (user) => {
        const created_date = user.createdDate;
        const today = new Date();
        const diffTime = Math.abs(today - created_date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        if(diffDays > 30) {
          await prisma.user.delete({
            where: {
              id: user.id
            }
          })
        }
    }));
    
}
  return NextResponse.json({ message: "Unverified Users Removed Successfully." }, {status: 200});
    
  } catch (error) {
    return NextResponse.json({ message: "Failed to schedule tokens.", details: error}, {status: 400});
  }

  
}