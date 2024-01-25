import {NextResponse} from 'next/server';

import {  findMultiRecords, userTokenValidation } from '@/app/lib/functions';

export const GET = async (request, context) => {
    
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    
    const {fieldName, value} = context.params;
    const boolValue = value === 'true' ? true : false;

    if(fieldName === 'id'){
        return NextResponse.json({error: {message: "User Id cannot be searched by this method."}}, { status: 404 })
    }
    try {
    if (fieldName === 'emailVerified') {
        const records = await findMultiRecords(fieldName, boolValue, 'user');
        return NextResponse.json(records);
    }
    const records = await findMultiRecords(fieldName, value, 'user');
    return NextResponse.json(records);
    
    } catch (error) {
        console.log(error)
        return NextResponse.json({error: {message: "Failed to find users.", details: error}}, { status: 400 })
    }

}
