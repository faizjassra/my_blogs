import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className='w-full h-screen flex justify-center items-center flex-col'>
      <img
        className='w-100 h-100  '
        src='7866.png_1200.png '
        alt='Not Found'
      />
      <Link to="/" className='bg-gray-800 my-5 curson-pointer text-white p-4 text-md rounded'>
        <div className=' flex justify-center items-center flex-wrapper gap-2'>
          Home
          <IoHomeOutline size={20} />
        </div>
      </Link>
    </div>

  )
}
