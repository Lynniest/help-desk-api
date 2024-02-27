import { userTokenValidation } from "@/app/lib/functions";
import prisma from "@/app/lib/prisma";
import axios from "axios";
import {NextResponse} from "next/server";
import { hashPassword, comparePassword } from "@/app/lib/passwordFun";

export const POST = async (request, context) => {
    const token = await userTokenValidation(request);
    const {id} = context.params;
    const data = await request.json();
    const {oldPassword, newPassword} = data;
    
    if (!token) {
    return NextResponse.json({error: { message: 'Missing or invalid Authorization' }}, { status: 401 });
    }

    try{
        const user = await prisma.user.findUnique({
            where: {
                id: parseInt(id, 10),
            }
        });
        if(!user){
            return NextResponse.json({error: "User Not Found."}, { status: 404 });
        }
        const password_match = user && await comparePassword(oldPassword, user.password);
        if (!password_match) {
            return NextResponse.json({error: "Old Password does not match."}, { status: 400 });
        }
    try {

        const updatedUser = axios.post(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}/update_details`, {
            password: hashPassword(newPassword),
        }, {
            headers: {
                Authorization: request.headers.get('Authorization')
            }
        });
        return NextResponse.json({message: "Password updated Successfully."}, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: "Failed to update password", details: error}, { status: 400 });
    }
        } catch (error) {
            console.log(error);
            return NextResponse.json({error: "User Not Found.", details: error}, { status: 400 });
    }


    return NextResponse.json({message: "Password updated Successfully."}, { status: 200 });
};