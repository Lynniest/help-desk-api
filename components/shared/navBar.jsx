import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
const NavBar = () => {
  return (
    <div className='w-full flex justify-between items-center px-10 py-2 bg-custom-bg-light mb-2 text-white'>
      <Image src='/assets/images/logo.png' alt='logo' width={400} height={400} />
      <ul className='flex justify-between items-center text-lg'>
          <li className='mr-10'>
            <Link href="">Home</Link>
          </li>
          <li className='mr-10'><Link href="">Submit Ticket</Link></li>
          <li><Link href="">LogOut</Link></li>
      </ul>
    </div>
  )
}

export default NavBar
