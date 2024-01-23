import {NextResponse} from 'next/server';
import p from '@/app/lib/prisma';
import { userTokenValidation } from '@/app/lib/functions';
const prisma = p;


export const POST = async (request, context) => {
    const {id} = context.params;
    const parsedValue = parseInt(id, 10);
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    try {
        const deletedDept = await prisma.department.delete({
            where: {
                id: parsedValue<Infinity ? parsedValue : id,
            },
        });
        prisma.disconnect();
    return NextResponse.json({message: "Ticket Deleted Successfully.", department: deletedDept}, { status: 200 });
    } catch (error) {
        // console.log(error)
        if (error.name === "PrismaClientKnownRequestError"){
            return NextResponse.json({error: {message: error.meta.cause, details: error}}, { status: 400 })
        }
        return NextResponse.json({error: {message: "Failed to delete ticket.", details: error}}, { status: 400 })
    }
}