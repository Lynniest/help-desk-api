import { findAllRecords, sortTicketsByStatus, userTokenValidation } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export async function GET(request){
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const tickets = await findAllRecords('ticket');
    const records = sortTicketsByStatus(tickets.records, 'none', 'none');
    return NextResponse.json(records);
}
