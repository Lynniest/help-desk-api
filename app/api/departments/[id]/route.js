"use server";

import { findSingleRecord } from "@/app/lib/functions";
import {NextResponse} from 'next/server';

export const GET = async (request, context) => {
    const {id} = context.params;
    const dept = await findSingleRecord('id', Number(id), 'department');
    return NextResponse.json(dept);
}