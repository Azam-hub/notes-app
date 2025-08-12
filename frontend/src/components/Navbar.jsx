import React, { useContext, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaChevronDown } from "react-icons/fa6";
import { AppContext } from '../context/AppContext';
import api from '../config/api';
import Loading from './Loading';

const Navbar = () => {

  const { loggedIn, user, checkAuth, loading } = useContext(AppContext)
  
  const [showMenu, setShowMenu] = useState(false)

  const logout = async () => {
    try {
      const {data} = await api.post("/auth/logout");
      if (data.success) {
        checkAuth()
      }
    } catch (error) {
      console.log(error.response);
    }
  }

  return (
    <>
    <nav className='*:text-white px-5 py-3 bg-slate-600 flex justify-between items-center'>
      <NavLink to='/' className='text-2xl'>MyNotes</NavLink>

      {
        loggedIn === null ? "" :
        loggedIn ? 
        <div>
          <p className='flex items-center cursor-pointer' onClick={() => setShowMenu(!showMenu)}>Hi, {user.name} <span className='ml-2 text-sm'><FaChevronDown /></span></p>
          {
            showMenu ? 
            <div onClick={() => setShowMenu(false)} className='*:text-black min-w-40 absolute flex flex-col bg-white border border-black p-1 rounded-md'>
              <NavLink to='/profile' className="px-3 py-1 hover:bg-black hover:text-white">Profile</NavLink>
              <NavLink className="px-3 py-1 hover:bg-black hover:text-white" onClick={logout}>Logout</NavLink>
            </div>
            : ""
          }
        </div>
        :
        <NavLink to='/login' className='bg-blue-500 text-white px-4 py-2 rounded-md' >Login/Register</NavLink>

      }
    </nav>
    <Outlet/>
    </>
  )
}

export default Navbar