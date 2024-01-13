import {NextResponse} from 'next/server';

import {  findMultiRecords, sortTicketsByStatus } from '@/app/lib/functions';

export const GET = async (request, context) => {
    const {fieldName, value} = context.params;
    let parsedValue = value;
    try {
        if (fieldName === "issuerId" || fieldName === "departmentId" || fieldName === "categoryId" || fieldName === "assigneeId") {
            parsedValue = parseInt(value, 10);
    }
    const records = await findMultiRecords(fieldName, parsedValue, 'ticket');
    records = sortTicketsByStatus(records, 'all', 'all');
        return NextResponse.json(records);
    } catch (error) {
        // console.log(error)
        return NextResponse.json({error: {message: "failed to find tickets!", details: error}}, { status: 400 })
    }

}
