import {NextResponse} from 'next/server';

import {  findMultiRecords } from '@/app/lib/functions';

export const GET = async (request, context) => {
    const {value} = context.params;
    try {
    const records = await findMultiRecords("departmentName", value, 'department');
    return NextResponse.json(records);
    } catch (error) {
        return NextResponse.json({error: {error, message: "Failed to find departments!", details: error}}, { status: 400 })
    }
    
}
