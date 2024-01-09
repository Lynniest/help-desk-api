import { findSingleRecord } from "@/app/lib/functions";
import {NextResponse} from 'next/server';

export const GET = async (request, context) => {
    const {id} = context.params;
    const ticket = await findSingleRecord('id', Number(id), 'ticket');
    return NextResponse.json(ticket);
}