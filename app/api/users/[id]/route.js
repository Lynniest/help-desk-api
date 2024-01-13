"use server";

import {NextResponse } from 'next/server'

import { findSingleRecord, userTokenValidation } from '@/app/lib/functions';

export async function GET(request,  context) {

    const token = await userTokenValidation(request);
    if (!token) {
        return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    // console.log(context);
    const userId = Number(context.params.id);
    const user = await findSingleRecord('id', userId, 'user');
    return NextResponse.json(user);
}