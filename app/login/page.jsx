import { Input } from '@/components/ui/input';
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Page = () => {
  return (
    <div className='flex justify-center items-center min-h-[95% pt-[10%]'>
        <div className='bg-custom-bg-light rounded-3xl text-lg p-10 h-[480] w-[430px]'>
            <h1 className='text-center text-4xl font-bold mb-10 text-custom-header'>Login</h1>
            <form action="" className='flex flex-col gap-5 text-black'>
                <Input type='text' placeholder='Email or Username' className=" border-white rounded-full h-12 text-lg" />
                <Input type='password' placeholder='Password' className="text-lg  border-white rounded-full h-12" />
                <Link href="/login/forgot_password" className='mb-4 text-custom-header'><p>Forgot Password?</p></Link>
                <Button className="rounded-3xl h-12 text-xl font-light" >Log in</Button>
                <p className='text-center '>Don't have an account? <Link href="/register" className='ml-1 text-blue-500 hover:text-blue-700 underline'>Register</Link></p>
            </form>
        </div>
      
    </div>
  )
}

export default Page;
