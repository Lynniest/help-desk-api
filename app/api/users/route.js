"use server";

import { NextResponse } from 'next/server'
import { findAllRecords, userTokenValidation } from '@/app/lib/functions';


export async function GET(request){
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const users = await findAllRecords('user');
    return NextResponse.json(users);
}


