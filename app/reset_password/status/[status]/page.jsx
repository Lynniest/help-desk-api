import React from 'react'

const page = (request) => {
  const {status} = request.params;
  // console.log(status)
  return (
    <div className=" text-2xl flex flex-col items-center justify-center min-h-screen bg-custom-bg dark:bg-gray-900 px-4 text-center sm:px-6 lg:px-8">
      <div className='p-5'>
        { status === 'success' ? 
      <h1 >Password Changed Successfully. Close this tab and login again.</h1> : 
      <h1 >Verification Failed.</h1>
        }
      </div>

    </div>
  )
}

export default page