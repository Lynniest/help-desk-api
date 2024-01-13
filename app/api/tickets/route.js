import { findAllRecords, sortTicketsByStatus } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export async function GET(){
    const records = await findAllRecords('ticket');
    // const records = sortTicketsByStatus(tickets.records, 'all', 'none');
    return NextResponse.json(records);
}
