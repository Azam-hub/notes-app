import React, { useState } from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import api from '../config/api'
import { toast } from 'react-toastify'
import { loadingGif } from '../assets/assets'

function Login() {

  const navigate = useNavigate()
  const { checkAuth } = useContext(AppContext)

  const [state, setState] = useState("login")
  const [loading, setLoading] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // console.log(apiUrl);
  

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!email || !password) {
      return toast.error("All fields are required.")
    }

    if (state === "register") {

      if (!name || !confirmPassword) {
        return toast.error("All fields are required.")
      }

      if (password !== confirmPassword) {
        return toast.error("Password and confirm password doesnot match.")
      }

      
      try {
        setLoading(true)
        const {data} = await api.post("/auth/register", {
          name, email, password
        })

        setLoading(false)
        
        if (data.success) {
          toast.success(`Account Created. Verification mail has been sent on ${email}`)
        }

        setTimeout(() => {
          // location.href = `/verify-otp/${data.userId}`
          navigate(`/verify-otp/${data.userId}`)
        }, 2000);

      } catch (error) {
        toast.error(error.response.data.message);
      }
      

    } 
    else {
      setLoading(true)
      try {
        const { data } = await api.post("/auth/login", {
          email, password
        })

        if (data.success) {
          checkAuth()
          navigate("/")
        }
        
      } catch (error) {
        toast.error(error.response.data.message)
      }
      setLoading(false)
    }

  }


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className='border-1 border-gray-400 py-3 px-5 rounded-lg shadow-lg min-w-md'>
        <h2 className='text-2xl mb-5'>{state === "login" ? "Login" : "Register"}</h2>
        <form onSubmit={handleSubmit}>
          {state === "register" ?
          <div className='my-3'>
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Name" required />
          </div>
          : ""}
          <div className='my-3'>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Email" required />
          </div>
          <div className='my-3'>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Password" required />
          </div>
          {state === "register" ?
          <div className='my-3'>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm Password</label>
            <input onChange={(e)=>setConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="confirm-password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Confirm Password" required />
          </div>
          : ""}
          <div className='flex items-center'>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Submit</button>
            <div className={`${loading ? "block" : "hidden"}`}>
              <img src={loadingGif} alt="Loading" className='w-18' />
            </div>
          </div>
        </form>

        <p className='mt-2 text-md'>
          {state === "login" ? 
            <>Don't have an account? <Link onClick={() => setState("register")} className='text-blue-700 underline'>Register here</Link></>
            :
            <>Already have an account? <Link onClick={() => setState("login")} className='text-blue-700 underline'>Login here</Link></>
          }
          
        </p>
      </div>
    </div>
  )
}

export default Login