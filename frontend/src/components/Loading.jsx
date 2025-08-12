import React from 'react'
import { loadingGif } from "../assets/assets"

const Loading = () => {
  return (
    <div className='w-full h-screen fixed top-0 left-0 bg-[#00000070] flex justify-center items-center'>
      <img src={loadingGif} alt="Loading" className='w-32' />
    </div>
  )
}

export default Loading