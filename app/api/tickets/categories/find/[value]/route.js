import {NextResponse} from 'next/server';

import {  findMultiRecords, userTokenValidation } from '@/app/lib/functions';

export const GET = async (request, context) => {
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const {value} = context.params;
    try {
    const records = await findMultiRecords('categoryName', value, 'ticketCategory');
        return NextResponse.json(records);
    } catch (error) {
        // console.log(error);
        return NextResponse.json({error: {message: "Failed to find ticket categories", details: error}}, { status: 400 })
    }

}
