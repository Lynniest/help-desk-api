import {NextResponse} from 'next/server';

import {  findMultiRecords, sortTicketsByStatus, userTokenValidation } from '@/app/lib/functions';

export const GET = async (request, context) => {
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {fieldName, value} = context.params;
    let parsedValue = value;
    try {
        if (fieldName === "issuerId" || fieldName === "departmentId" || fieldName === "categoryId" || fieldName === "assigneeId") {
            parsedValue = parseInt(value, 10);
    }
    const tickets = await findMultiRecords(fieldName, parsedValue, 'ticket');
    const records = sortTicketsByStatus(tickets, 'all', 'none');
        return NextResponse.json(records);
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: {message: "failed to find tickets!", details: error}}, { status: 400 })
    }

}
