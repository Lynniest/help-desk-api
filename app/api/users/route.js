"use server";

import { NextResponse } from 'next/server'
import { findAllRecords } from '@/app/lib/functions';


export async function GET(){
    const users = await findAllRecords('user');
    return NextResponse.json(users);
}


