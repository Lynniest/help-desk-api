import { findSingleRecord, sortTicketsByStatus, userTokenValidation } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
    const token = userTokenValidation(request);
    if (!token) {
        return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {id, status, priority} = context.params;

   const dept = await findSingleRecord('id', Number(id), 'department');

   const tickets = sortTicketsByStatus(dept.tickets, status, priority);
 dept.tickets = tickets;
 return NextResponse.json(dept)
}