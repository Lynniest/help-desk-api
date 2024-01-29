"use server";
import jwt from 'jsonwebtoken';
import prisma from './prisma';
import { hashPassword } from './passwordFun';
import { permanentRedirect, redirect, useRouter, revalidate } from 'next/navigation'
import {NextResponse} from 'next/server';

export const submitResetPsw = async (token, previousState, formData) => {

    let form_error = {};

    const { newPassword, confirmNewPassword } = Object.fromEntries(formData);    
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);    
    // const userId = Number(token);
    if(newPassword.length < 8){
         form_error.newPasswordField = "Password must be at least 8 characters long.";
         return form_error;
    }
    if(newPassword !== confirmNewPassword ){
        form_error.confirmNewPasswordField = "Passwords do not match.";
        return form_error;
    }
    try {
        await prisma.user.update({
        where: { id: userId },
        data: { password: await (hashPassword(newPassword)) },
    });

    return {success: true};
    // router.push('/reset_password/status/success');
    } catch (error) {
        console.log(error)
        // console.log(JSON.stringify(error));
        form_error.common = "Failed to update password.";
        return form_error;
    }
}