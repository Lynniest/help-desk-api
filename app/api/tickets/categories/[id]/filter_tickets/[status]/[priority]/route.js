import { findAllRecords, findSingleRecord, sortTicketsByStatus, userTokenValidation } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
    const token = userTokenValidation(request);
    if (!token) {
        return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {id, status, priority} = context.params;
    // console.log(id, status, priority)
    const parsedId = parseInt(id, 10);
   const ticketCategory = await findSingleRecord('id', Number(id), 'ticketCategory');

   const tickets = sortTicketsByStatus(ticketCategory.tickets, status, priority);
 ticketCategory.tickets = tickets;
 return NextResponse.json(ticketCategory)
}