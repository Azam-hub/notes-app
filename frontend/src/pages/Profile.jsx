import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from "../context/AppContext"
import {toast} from "react-toastify"
import api from '../config/api'

const Profile = () => {

  const {user, checkAuth} = useContext(AppContext)

  const [name, setName] = useState(user.name)
  const [email, setEmail] = useState(user.email)

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
  }, [user])

  const handleInfoSubmit = async (e) => {
    e.preventDefault()

    try {
      const { data } = await api.post("/auth/set-profile", {
        action: "general",
        name, email
      })
      if (data.success) {
        toast.success(data.message)
        checkAuth()
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }


  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()

    try {
      const {data} = await api.post("/auth/set-profile", {
        action: "password",
        oldPassword, newPassword, confirmPassword
      })

      if (data.success) {
        toast.success(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }
  

  return (
    <div className='w-[90%] mx-auto py-5'>
      <h1 className='text-3xl font-semibold'>My Profile</h1>
      
      <div className='flex gap-5 my-4'>
        <form className='basis-1/2' onSubmit={handleInfoSubmit}>
          <div className='my-3'>
            <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" id="name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Name" required />
          </div>
          <div className='my-3'>
            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Email" required />
          </div>
          <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer'>Update</button>
        </form>
        <form className='basis-1/2' onSubmit={handlePasswordSubmit}>
          <div className='my-3'>
            <label for="old-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Old Password</label>
            <input onChange={(e)=>setOldPassword(e.target.value)} value={oldPassword} type="password" id="old-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Old Password" required />
          </div>
          <div className='my-3'>
            <label for="new-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
            <input onChange={(e)=>setNewPassword(e.target.value)} value={newPassword} type="password" id="new-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter New Password" required />
          </div>
          <div className='my-3'>
            <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
            <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="confirm-password" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Confirm Password" required />
          </div>
          <button type='submit' className='bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer'>Update</button>
        </form>
      </div>
    </div>
  )
}

export default Profile