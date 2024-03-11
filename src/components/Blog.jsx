import React from 'react'
import { Link } from 'react-router-dom'

export default function Blog({ post }) {

  return (

    <div key={post.id} className="lg:w-[30%] w-full   bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 ">
      <div className='flex flex-col justify-between h-[100%]  '>

        <img
          src={post.image ? post.image : ""}
          alt={post.title}
          className="w-full  min-h-56 h-56 sm:h-56  object-cover"
        />


        <div className="p-5 h-full  ">
          <Link to="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {post.title}

            </h5>
          </Link>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {post.description.length > 50 ? post.description.substring(0, 120) + "..." : post.description}

          </p>
        </div>
        <div className='flex justify-end  items-end  w-full '>
          <div className="w-full h-full  flex justify-between items-center text-xs px-6">
            <span className="text-sm  text-gray-500 ">
              {post.datetime}
            </span>

            <Link className='text-white flex-1 text-center mx-10 font-medium bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg text-sm p-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700' to={`/detail/${post.id}`}>
              Detail
            </Link>

            <span className="relative  rounded-full bg-gray-50 px-2 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
              {post.category}
            </span>
          </div>
        </div>

        <div className='text-center  p-2 text-xs text-gray-400'>
          created by {post.user ? post.user : '❤️'}
        </div>
      </div >
    </div>
  )
}
