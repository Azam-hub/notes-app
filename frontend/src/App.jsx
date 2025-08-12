import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import VerifyOtp from './pages/VerifyOtp'
import Todo from './pages/Notes'
import Navbar from './components/Navbar'
import Profile from './pages/Profile'
import CheckAuth from './middlewares/CheckAuth'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Navbar />}>
        <Route index element={<Todo />} />
        <Route path='/profile' element={<CheckAuth status="should-loggedIn"><Profile /></CheckAuth>} />
        <Route path='/login' element={<CheckAuth status="should-not-loggedIn"><Login /></CheckAuth>} />
        <Route path='/verify-otp/:userId' element={<CheckAuth status="should-not-loggedIn"><VerifyOtp /></CheckAuth>} />
      </Route>
    </Routes>
  )
}

export default App
