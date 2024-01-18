import React from 'react'

const page = (request) => {
  const {status} = request.params;
  // console.log(status)
  return (
    <div className="text-black flex flex-col items-center justify-center min-h-screen bg-custom-bg dark:bg-gray-900 px-4 text-center sm:px-6 lg:px-8">
      
      <h1 >Help Desk API</h1>
      
    </div>
  )
}

export default page