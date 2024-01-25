import { findAllRecords, sortTicketsByStatus, userTokenValidation } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
    const token = userTokenValidation(request);
    if (!token) {
        return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const { status, priority} = context.params;
    // console.log(status, priority)
    const tickets = await findAllRecords('ticket');
    const records = sortTicketsByStatus(tickets.records, status, priority);
    tickets.records = records;
 return NextResponse.json(tickets)
}