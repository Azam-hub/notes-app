import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../config/api';

function VerifyOtp() {

  const navigate = useNavigate()
  const { userId } = useParams()

  const [otp, setOtp] = useState("")

  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!otp) {
      return toast.error("OTP is required!")
    }

    try {
      const { data } = await api.post("/auth/verify-otp", {
        userId, otp
      })
      
      if (data.success) {
        toast.success(data.message)

        setTimeout(() => {
          // location.href = "/login"
          navigate("/login")
        }, 2000);
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }  
  
  return (
    <div className='h-screen flex justify-center items-center'>
      <div className='border-1 border-gray-400 py-3 px-5 rounded-lg shadow-lg min-w-md'>
        <h2 className='text-2xl mb-5'>Verify OTP</h2>
        
        <form onSubmit={handleSubmit}>
          <div className='my-3'>
            <label for="otp" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">OTP</label>
            <input onChange={(e)=>setOtp(e.target.value)} value={otp} type="number" id="otp" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your OTP" required />
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
        </form>
        
      </div>
    </div>
  )
}

export default VerifyOtp