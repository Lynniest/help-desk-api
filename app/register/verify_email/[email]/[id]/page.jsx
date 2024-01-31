"use client";

import { Button } from "@/components/ui/button"
import axios from 'axios';

const VerifyEmailPage = (request) => {
    const {email, id} = request.params;
    const decodedEmail = decodeURIComponent(email);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-custom-bg dark:bg-gray-900 px-4 text-center sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <MailIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Check your email</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 ">
            We have sent a verification link to <span className="font-extrabold">{decodedEmail}</span>. Please check your email and click on the
            verification link to complete the email verification process. <br/>
            <span className="font-extrabold"> Accounts with unverified emails will be deleted after 30days. </span>
          </p>
        </div>
        <div className="mt-5">
          <Button className="w-full bg-custom-btn" onClick={async()=>{await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/resend_email`, { email: decodedEmail, id: id, type: "verification"});}}>Resend Verification Email</Button>
        </div>
      </div>
    </main>
  )
}
export default VerifyEmailPage;

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}