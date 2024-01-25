"use client";

import { Button } from "@/components/ui/button"
import React from 'react'
import axios from 'axios';

const page = (request) => {
    // console.log(request) 
    // console.log(process.env.API_URL)

    const {email, id} = request.params;
    const decodedEmail = decodeURIComponent(email);
    // console.log(email, id)
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-custom-bg dark:bg-gray-900 px-4 text-center sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <MailIcon className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">Check your email</h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            We have sent a verification link to your email address({decodedEmail}). Please check your email and click on the
            verification link to complete the email verification process.
          </p>
        </div>
        <div className="mt-5">
          <Button className="w-full bg-custom-btn" onClick={()=>{axios.post(`${process.env.API_URL}/resend_email`, { email: decodedEmail, id: id, type: "verification"})}}>Resend Verification Email</Button>
        </div>
      </div>
    </main>
  )
}
export default page

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