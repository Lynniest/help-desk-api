import {NextResponse} from 'next/server';

import {  findMultiRecords } from '@/app/lib/functions';

export const GET = async (request, context) => {
    const {fieldName, value} = context.params;
    if(fieldName === 'id'){
        return NextResponse.json({error: {message: "User Id cannot be searched."}}, { status: 400 })
    }
    try {
    const records = await findMultiRecords(fieldName, value, 'user');
    return NextResponse.json(records);
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: {error, message: "Failed to find users."}}, { status: 400 })
    }

}
