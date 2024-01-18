import { findSingleRecord, sortTicketsByStatus, userTokenValidation } from "@/app/lib/functions";
import { NextResponse } from "next/server";

export const GET = async (request, context) => {
    const token = userTokenValidation(request);
    if (!token) {
        return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {id, status, priority} = context.params;
    // console.log(id, status, priority)
    const user = await findSingleRecord('id', Number(id), 'user');

 const new_submitted_tickets = user.submittedTickets ? sortTicketsByStatus(user.submittedTickets, status, priority): user.submittedTickets;
 
 const new_assigned_tickets =  user.assignedTickets ? sortTicketsByStatus(user.assignedTickets, status, priority): user.assignedTickets;
 user.submittedTickets = new_submitted_tickets;
 user.assignedTickets = new_assigned_tickets;
 return NextResponse.json(user)
}