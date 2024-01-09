import {NextResponse} from 'next/server';

import {  findMultiRecords } from '@/app/lib/functions';

export const GET = async (request, context) => {
    const {value} = context.params;
    try {
    const records = await findMultiRecords('categoryName', value, 'ticketCategory');
        return NextResponse.json(records);
    } catch (error) {
        // console.log(error);
        return NextResponse.json({error: {error, message: "Failed to find ticket categories"}}, { status: 400 })
    }

}
