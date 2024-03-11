import React, { useEffect, useState } from 'react';
import Blog from '../components/Blog';
import { onValue, ref } from 'firebase/database'
import { db } from '../firebase'
import Navbar from '../components/Navbar';
import TextField from '@mui/material/TextField';
import { CiSearch } from "react-icons/ci";
import { InputAdornment } from '@mui/material';
export default function Home() {
  const [posts, setPosts] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    const readBlogs = onValue(ref(db, 'blogs'), (snapshot) => {
      let arr = []
      snapshot.forEach((data) => {
        arr.push({ ...data.val(), id: data.key })
      })
      setPosts(arr)
    });

    return () => readBlogs
  }, [])

  return (
    <div >
      <Navbar />

      <div className="w-full h-full bg-white mt-5  ">
        <div className="w-full h-full  px-8 lg:px-8">
          <div className="w-full  ">
            <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">From the blog</h2>
            <p className="mt-2 text-center text-lg leading-8 text-gray-600">
              Learn how to grow your business with our expert advice.
            </p>
          </div >
          <br />
          <div className='sm:flex w-full justify-center items-center '>
            <div className='flex justify-center sm:w-[30%]  items-center'>
              <TextField
                className='w-full'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CiSearch size={25} />
                    </InputAdornment>
                  ),

                  sx: { borderRadius: 4 }
                }}
                id="Search"
                placeholder='Search for the category'
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />

            </div>
          </div>

          <div className=" mt-10 sm:flex justify-center gap-10 sm:flex-wrap">
            {posts && posts.filter((post) =>
              post.category.toString().toLowerCase().includes(input.toLowerCase())
            ).map((post, index) => (
              <Blog key={index} post={post} />
            ))}

          </div>
        </div>
      </div>
    </div >
  )
}
