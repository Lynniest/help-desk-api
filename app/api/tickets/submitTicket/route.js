"use server";

import { ticketSchema } from '@/app/lib/schema_validation';
import {NextResponse } from 'next/server'
import p from '@/app/lib/prisma';
import { findAllRecords } from '@/app/lib/functions';
import {ZodError} from "zod";

const prisma = p;

export const GET = async (request, context) => {
    const allTickets = await findAllRecords('ticket');
    return NextResponse.json(allTickets);
}

export async function POST(request) {

    const body = await request.json();
    const valid = ticketSchema.parseAsync(body);
    try {
        const newTicket = await prisma.ticket.create({
            data:{
                title: body.title,
                description: body.description,
                status: body.status? body.status :  "Pending",
                priority: body.priority? body.priority : "Low",
                categoryId: body.categoryId,
                assigneeId: body.assigneeId? body.assigneeId : null,
                startDate: body.startDate? body.startDate : null,
                endDate: body.endDate? body.endDate : null,
                submittedDate: new Date().toISOString(),
                issuerId: body.issuerId,
                departmentId: body.departmentId,
                
            }
        
        })
        return NextResponse.json({message: "Ticket Added Successfully.", ticket: newTicket}, { status: 200});
        
    } catch (error) {
        
        if (error instanceof ZodError) {
            return NextResponse.json({error: {message: "Failed to add new ticket.", details:error.issues}}, { status: 400 });
        }

        // console.log(error)
        return new Response(JSON.stringify({error: "Failed to add new ticket"}), { status: 400 })
    }
}
