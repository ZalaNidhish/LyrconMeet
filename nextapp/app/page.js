import React from 'react'
import Link  from 'next/link'

const page = () => {
  return (
    <div className='bg-neutral-100 h-screen w-screen text-black flex items-center justify-center gap-10 flex-col'>
      Schedule a Meet for Lyrcon Solutions.

    <Link href="/scheduleMeeting">
       <div className='bg-indigo-400 cursor-pointer rounded-2xl p-4 text-white'>
        Schedule a Meet.
      </div>
    </Link>
     

    </div>
  )
}

export default page
