import { onValue, ref, remove } from 'firebase/database'
import { ref as sref, deleteObject } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db, storage } from '../firebase'
import { useNavigate } from 'react-router-dom'
import { MdDeleteForever } from "react-icons/md"
import { MdEdit } from "react-icons/md";
import Modal from '../components/Modal';
import { IoChevronBack } from "react-icons/io5";
import { auth } from '../firebase'
import { ToastContainer, toast } from 'react-toastify';

export default function Details() {
  let { id } = useParams()
  const [data, setData] = useState({})
  const router = useNavigate();
  const [showModal, setShowModal] = useState(false);


  useEffect(() => {
    const fetchPost = onValue(ref(db, "blogs/" + id), (snapshot) => {
      setData(snapshot.val())
    })

    return () => fetchPost

  }, [id])


  const handleDelete = async () => {
    if (window.confirm('Are you sure?') === false) return
    toast.success("Blog deleted successfully..")
    try {
      await remove(ref(db, `blogs/` + id))
      await remove(ref(db, `users/` + auth.currentUser.uid + '/blogs/' + id))
      await deleteObject(sref(storage, id))
      router(-1)

    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  return (
    <div className="h-full mx-auto max-w-7xl bg-white mt-5  ">
      <div className="w-full h-full  px-6 lg:px-8">
        <Modal
          setShowModal={setShowModal}
          showModal={showModal}
          data={data}
          id={id}
        />
        <ToastContainer />
        <div className="flex flex-col justify items-start sm:py-12 inset-y-0">
          <div onClick={() => router(-1)} className="sm:mt-0 flex gap-1 items-center cursor-pointer">
            <IoChevronBack size={20} />
            <p >back</p>
          </div>
        </div>
        <div className="w-full  ">
          <h2 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Details the blog</h2>
        </div>
        <div className="w-full bg-white mt-5  ">
          <div className="w-full px-6 lg:px-8">

            <div className=" mt-4 flex justify-center">
              <img src={data && data.image} alt="" srcset="" />
            </div>
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                Category:
                <div className="mx-2 relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
                  {data && data.category}
                </div>
              </div>
              <div>
                <p className=" text-gray-500">
                  {data && data.datetime}
                </p>
              </div>
            </div>

            <div className='mt-8'>
              <h1 className='text-4xl font-bold text-center'>{data && data.title}</h1>
            </div>
            <div className='mt-5 text-md leading-8'>
              <p>{data && data.description}</p>
              <br />
              {/* <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magni, itaque voluptate ad odio, ut enim deserunt voluptatem necessitatibus eligendi modi velit sit blanditiis molestias! Minima pariatur cupiditate consequuntur sit alias provident dicta possimus vero quod veniam ut nulla suscipit tempora doloremque, ullam molestias reprehenderit asperiores amet sapiente. Ratione, aperiam sunt.</p> */}
            </div>
            {data && data.user === (auth.currentUser && auth.currentUser.email) ? (
              <div className='w-full h-full flex justify-center  '>
                <div onClick={handleDelete} className=' cursor-pointer flex p-4 px-4 justify-center items-center  m-5 rounded bg-red-400'>

                  <button className='text-lg text-white px-2 '>
                    Delete
                  </button>

                  <MdDeleteForever size={30} color='white' />

                </div>
                <div onClick={() => setShowModal(true)} className=' cursor-pointer flex p-4 px-4 justify-center items-center  m-5 rounded bg-yellow-400'>

                  <button className='text-lg text-white px-2 '>
                    Update
                  </button>

                  <MdEdit size={30} color='white' />

                </div>


              </div>
            ) : ""}

          </div>

        </div>


      </div>

    </div >
  )
}
