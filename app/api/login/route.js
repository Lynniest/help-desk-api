import { userTokenValidation } from "@/app/lib/functions";
import { comparePassword } from "@/app/lib/passwordFun";
import prisma from "@/app/lib/prisma";
import {NextResponse} from "next/server";

export const POST = async(request) => {
    const body = await request.json();
    const {userCred, password} = body;
    let user = null;
    try {
        user = await prisma.user.findUnique({
            where: {
                username: userCred,
            }
        })
        if(!user) {user = await prisma.user.findUnique({
            where: {
                email: userCred,
            }
        })}
        if (user){
            const correctPassword =  await comparePassword(password, user.password);
            if (correctPassword){
                const {password, ...userWithoutPassword} = user;
                return NextResponse.json({message: "Login credentials correct.", currentUser: userWithoutPassword}, {status: 200})
            }
            return NextResponse.json({error: {message: "Incorrect Credentials!", details: "Wrong Password!"}}, {status: 404})
        }
        return NextResponse.json({error: {message: "Incorrect Credentials!", details: "User Not Found!"}}, {status: 404})

    } catch (error) {
        return NextResponse.json({error: {message: "LogIn Failed.", details: error}}, {status: 400});
    }

}