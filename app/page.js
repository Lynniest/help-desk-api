import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button';

const page = (request) => {
  return (
    <div className="text-black flex justify-between min-h-[95%] items-start dark:bg-gray-900 px-4 sm:px-6 lg:px-4">
      
      <Image src="/assets/images/hd_home_svg.svg" width={600} height={600} className='hidden ml-[10%] lg:block'/>
      <div className='flex flex-col justify-end self-start min-h-full'>
        <Image className="" src="/assets/images/helpDeskSvg.svg" width={600} height={600}/>
        <div className='text-white self-end justify-self-end min-h-full pt-20 px-6'>
          <h1 className="text-3xl mb-5">Warmly welcome to our website</h1>
          <p className="text-custom-btn mb-10">
            Feel free to click "submit" for assistance or questions.<br/>
            I'm here and ready to help. Don't hesitate to ask!
          </p>

        <Button className="mt-4 bg-custom-btn font-light w-64 h-12 text-xl rounded-full">
          <Link href="/login"> Get Started </Link>
        </Button>

        </div>

      </div>
      
    </div>
  )
}

export default page

