"use server";
import {NextResponse } from 'next/server'
import p from '@/app/lib/prisma';
import { userTokenValidation } from '@/app/lib/functions';

const prisma = p;

export async function POST(request, context) {
    // console.log(request.headers.get('Authorization'))
    try {
        const {id} = context.params;
        const parsedValue = parseInt(id, 10);
        const token = await userTokenValidation(request);
        if (!token) {
        return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
        }
        const deletedUser = await prisma.user.delete({
            where: {
                id: parsedValue < Infinity ? parsedValue : id,
            },
    })
    return NextResponse.json({message: "User Deleted Successfully.", user: deletedUser}, { status: 200 });
    } catch (error) {
        console.log(error)
        if (error.name === "PrismaClientKnownRequestError"){
            return NextResponse.json({error: {message: error.meta.cause, details: error}}, { status: 400 })
        }
        return NextResponse.json({error: {message: "Failed to delete user.", details: error}}, { status: 400 })
    }

}
