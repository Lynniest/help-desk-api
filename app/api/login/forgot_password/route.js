import { findSingleRecord } from "@/app/lib/functions";
import { sendEmail } from "@/app/lib/send_mail";
import {NextResponse} from "next/server";

export const POST = async(request) =>{
    try {
        const body = await request.json();
        const {userCred} = body;
        const user = await findSingleRecord("username", userCred, "user") || await findSingleRecord("email", userCred, "user");
        if(!user){
            return NextResponse.json({error: {message: "Username or Email Not Found"}});
        }
        const {id, email} = user;
        await sendEmail(email, id, "resetPassword");  
        return NextResponse.json({ message: "Email sent successfully.", user: user }, { status: 200 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({error: {message: "Failed to send email to reset password.", details: error}}, {status: 400});
    }
    
}
