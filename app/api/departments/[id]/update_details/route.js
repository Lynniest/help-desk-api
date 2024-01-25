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
        const updatedDept = await updateRecordById({id, data: new_data, tableName: 'department'});
        return NextResponse.json({message: "Department name updated Successfully.", department: updatedDept}, { status: 200 });
    } catch (error) {
        if (error.code==='P2002'){
            return NextResponse.json({error: {message: "Department name already exists", detials: error}}, { status: 400 })
        }
        console.log(error)
        return NextResponse.json({error: {message: "Failed to update department name.", details: error}}, { status: 400 })
    }

}