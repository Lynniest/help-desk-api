import {NextResponse} from 'next/server';
import { deptSchema } from '@/app/lib/schema_validation';
import { findAllRecords } from '@/app/lib/functions';
import {ZodError} from "zod";
import p from '@/app/lib/prisma';

const prisma = p;

export const GET = async() =>{
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
         if (error instanceof ZodError) {
        return NextResponse.json({error: { message: "Failed to add new department.", details:error.issues}}, { status: 400 });
    }
        // console.log(error);
        return new Response(JSON.stringify({error: {message: "Failed to add new department", details: error}}), {status: 400})
    }
}
