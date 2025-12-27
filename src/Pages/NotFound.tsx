import React from 'react'

const NotFound = () => {
  return (
    <div className=' h-screen w-full flex justify-center  gap-1 items-center text-zinc-400'>
      Oops you came somewhere else 
       <a href='/matching' className='underline text-blue-400'>Home</a>
    </div>
  )
}

export default NotFound
