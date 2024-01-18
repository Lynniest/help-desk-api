"use server";
import {NextResponse } from 'next/server'
import { updateRecordById, updateUserToken, userTokenValidation } from '@/app/lib/functions';
import { ZodError } from 'zod';

export async function POST(request, context) {

    const new_data = await request.json();
    // console.log(new_data)

    const token = await userTokenValidation(request);
    const {id} = context.params;
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    try {
        const updatedUser = await updateRecordById({id, data: new_data, tableName: 'user'});
        
        return NextResponse.json({message: "User details updated Successfully.", user: updatedUser}, { status: 200 });
    } catch (error) {
        if (error.code==='P2002'){
            return NextResponse.json({error: {message: "User name already exists", details: error}}, { status: 400 })
        }
        // console.log(error)
        return NextResponse.json({error: "Failed to update user details", details: error}, { status: 400 })
    }

}