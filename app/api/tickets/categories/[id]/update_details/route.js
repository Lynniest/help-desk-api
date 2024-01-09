"use server";
import {NextResponse } from 'next/server'
import { updateRecordById, userTokenValidation } from '@/app/lib/functions';

export async function POST(request, context) {

    const new_data = await request.json();
    const {id} = context.params;
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }

    try {
        const updatedCate = await updateRecordById({id, data: new_data, tableName: 'ticketCategory'});
        return NextResponse.json({message: "Category details updated Successfully.", Category: updatedCate}, { status: 200 });
    } catch (error) {
        if (error.code==='P2002'){
            return NextResponse.json({error: {message: "Category name already exists"}}, { status: 400 })
        }
        // console.log(error)
        return NextResponse.json({error: {message: "Failed to update category details"}}, { status: 400 })
    }

}