import { findSingleRecord, userTokenValidation } from "@/app/lib/functions";
import {NextResponse} from 'next/server';

export const GET = async (request, context) => {
        const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {id} = context.params;
    const ticket = await findSingleRecord('id', Number(id), 'ticket');
    return NextResponse.json(ticket);
}