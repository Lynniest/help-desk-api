import {NextResponse} from 'next/server';
import { ticketCategorySchema } from '@/app/lib/schema_validation';
import { findAllRecords, userTokenValidation } from '@/app/lib/functions';

import p from '@/app/lib/prisma';
const prisma = p;

export const GET = async(request) =>{
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    const categories = await findAllRecords('ticketCategory');
    return NextResponse.json(categories);
}

export const POST = async(request) =>{
    const body = await request.json();
    const valid = await ticketCategorySchema.parseAsync(body);
    try{
        const newCate = await prisma.ticketCategory.create({
            data:{
                categoryName: body.categoryName,
            }
        })
        return NextResponse.json({message: "New Ticket Category added successfully.", department: newCate}, { status: 200});
    }catch(error){

        if (error instanceof ZodError) {
            return NextResponse.json({error: {message: "Failed to add new ticket category.", details:error}}, { status: 400 });
        }
        console.log(error);
        return new Response(JSON.stringify({error: {message: "Failed to add new ticket category", details:error}}), {status: 400})
    }
}
