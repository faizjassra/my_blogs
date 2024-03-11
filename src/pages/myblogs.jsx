import { onValue, ref } from 'firebase/database'
import React, { useEffect, useState } from 'react'
import { IoChevronBack } from "react-icons/io5";
import { auth, db } from '../firebase'
import { useNavigate } from 'react-router-dom'
import Blog from '../components/Blog';

function MyBlogs() {
    const [blogs, setBlogs] = useState(null)
    const router = useNavigate();

    useEffect(() => {


        let arr = []
        const call = onValue(ref(db, 'users/' + (auth.currentUser && auth.currentUser.uid) + '/blogs/'), (snapshot) => {
            snapshot.forEach((blog) => {
                arr.push({ ...blog.val() })
                console.log(arr)
            })
            
            setBlogs(arr)
        });
        return () => call

    }, [])



    return (
        <div className='p-5'>
            <div className="flex flex-col justify items-start sm:py-12 inset-y-0">
                <div onClick={() => router(-1)} className="sm:mt-0 flex gap-1 items-center cursor-pointer">
                    <IoChevronBack size={20} />
                    <p >back</p>
                </div>
            </div>
            {blogs && blogs.length > 0 ? (
                <div>
                    <div className='text-4xl'>My Blogs</div>


                    <div className=" mt-10 sm:flex justify-center gap-10 sm:flex-wrap">
                        {(blogs !== null) && blogs.map((blog, index) => (

                            <Blog key={index} post={blog} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className='text-gray-300 text-4xl text-center'>Empty</div>
            )}

        </div>

    )
}

export default MyBlogs