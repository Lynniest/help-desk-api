import jwt from 'jsonwebtoken';
import { scheduleTokenUpdates, updateRecordById, updateUserToken } from '@/app/lib/functions';
import {NextResponse} from 'next/server';

export async function GET(request, context) {
    const { token } = context.params;

    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(userId);

      const updatedUser = await updateRecordById({tableName: 'user',id: userId,data: { emailVerified: true }});
      // console.log(updatedUser);
      await updateUserToken(updatedUser.id);
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/register/verify_email/status/success`)
      // return NextResponse.json({ message: 'Email verified successfully', user: updatedUser }, {status: 200});
    } catch (error) {
        console.log(error)
      // return NextResponse.json({ message: 'Invalid token', detials: error }, {status: 400});
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST_URL}/register/verify_email/status/fail`)
    }
  
}