"use server";

import {NextResponse } from 'next/server'

import { findSingleRecord } from '@/app/lib/functions';

export async function GET(request,  context) {
    // console.log(context);
    const userId = Number(context.params.id);
    const user = await findSingleRecord('id', userId, 'user');
    return NextResponse.json(user);
}