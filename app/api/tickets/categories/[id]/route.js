import { findSingleRecord } from "@/app/lib/functions";
import {NextResponse} from 'next/server';


export const GET = async (request, context) => {
    const {id} = context.params;
    const ticketCategory = await findSingleRecord('id', Number(id), 'ticketCategory');
    return NextResponse.json(ticketCategory);
}