import {userTokenValidation} from '@/app/lib/functions';
import {NextResponse} from 'next/server';



export const POST = async (request, context) => {
    const {id} = context.params;
    const token = await userTokenValidation(request);
    if (!token) {
      return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }
    try {
        const deletedCate = await prisma.ticketCategory.delete({
            where: {
                id: Number(id),
            },
        });
    return NextResponse.json({message: "Department Deleted Successfully.", department: deletedCate}, { status: 200 });
    } catch (error) {
        console.log(error)
        if (error.name === "PrismaClientKnownRequestError"){
            return NextResponse.json({error: {message: error.meta.cause, details: error}}, { status: 400 })
        }
        return NextResponse.json({error: {error, message: "Failed to delete department.", details: error}}, { status: 400 })
    }
}

