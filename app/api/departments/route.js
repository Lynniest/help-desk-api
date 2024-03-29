import {NextResponse} from 'next/server';
import { deptSchema } from '@/app/lib/schema_validation';
import { findAllRecords, userTokenValidation } from '@/app/lib/functions';
import {ZodError} from "zod";
import p from '@/app/lib/prisma';

const prisma = p;

export const GET = async(request) =>{
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const depts = await findAllRecords('department');
    return NextResponse.json(depts);
}

export const POST = async(request) =>{

    const body = await request.json();
    const valid = await deptSchema.parseAsync(body);
    try{
        const newDept = await prisma.department.create({
            data:{
                departmentName: body.departmentName,
            }
        })
        return NextResponse.json({message: "New Department added successfully.", department: newDept}, { status: 200});
    }catch(error){
        console.log(error);
         if (error instanceof ZodError) {
        return NextResponse.json({error: { message: "Failed to add new department.", details:error.issues}}, { status: 400 });
    }
        
        return new Response(JSON.stringify({error: {message: "Failed to add new department", details: error}}), {status: 400})
    }
}
