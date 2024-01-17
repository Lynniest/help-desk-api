import { findSingleRecord, userTokenValidation } from "@/app/lib/functions";
import {NextResponse} from 'next/server';


export const GET = async (request, context) => {
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {id} = context.params;
    const ticketCategory = await findSingleRecord('id', Number(id), 'ticketCategory');
    return NextResponse.json(ticketCategory);
}