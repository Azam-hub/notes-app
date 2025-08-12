import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { BsPinAngle, BsFillPinAngleFill } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import api from '../config/api'
import { LiaEditSolid } from "react-icons/lia";
import { GoTrash } from "react-icons/go";
import { IoIosLogIn } from "react-icons/io";




const Todo = () => {

  const appData = useContext(AppContext);
  const navigate = useNavigate();

  const [showBox, setShowBox] = useState(false)
  const [pinned, setPinned] = useState(false)
  const [notes, setNotes] = useState([])
  const [allNotes, setAllNotes] = useState([])

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const [updatingNoteId, setUpdatingNoteId] = useState("")
  
  const addBtnHandler = () => {
    if (!appData.loggedIn) {
      toast.error("First login to add note.")
      return navigate("/login")
    }

    if (updatingNoteId !== "") {
      setUpdatingNoteId("")
      setTitle("")
      setDescription("")
      setPinned(false)
      setShowBox(true);
      return
    }
    setShowBox(!showBox);

  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (updatingNoteId === "") {
        const { data } = await api.post("/notes/create", {
          title, description, pinned
        })
        
        if (data.success) {
          toast.success(data.message)
          fetchNotes()
  
          setShowBox(false)
          setTitle("")
          setDescription("")
          setPinned(false)
        }
      } else {
        const {data} = await api.post("/notes/update", {
          noteId: updatingNoteId, title, description, pinned
        })

        if (data.success) {
          toast.success(data.message)
          fetchNotes()
  
          setShowBox(false)
          setTitle("")
          setDescription("")
          setPinned(false)
          setUpdatingNoteId("")
        }
      }

    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const fetchNotes = async () => {
    const {data} = await api.get("/notes")
    setNotes(data.notes);
    setAllNotes(data.notes);
  }

  useEffect(() => {
    if (appData.loggedIn) {
      fetchNotes()
    }
    
  }, [appData])
  

  const updateNote = (noteId) => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // Adds a smooth animation to the scroll
    });

    const note = notes.find((note) => note._id === noteId)

    setShowBox(true)
    setUpdatingNoteId(note._id)
    setTitle(note.title)
    setDescription(note.description)
    setPinned(note.pinned)
        
  }

  const deleteNote = async (noteId) => {
    console.log(noteId);
    
    if (window.confirm("Are you sure to delete this note?")) {
      
      const {data} = await api.post("/notes/delete", {
        noteId
      })

      if (data.success) {
        toast.success(data.message)
        fetchNotes()
      }
    }




    
  }


  const searchNote = (e) => {
    const searchStr = e.target.value
    // console.log(notes.filter((note) => note.title == searchStr || note.description == searchStr))
    setNotes(allNotes.filter(
      (note) => {
        if ((note.title).includes(searchStr) || (note.description).includes(searchStr)) {
          return note
        }
      }
    ))
  }


  return (
    <div className='w-[95%] mx-auto py-5'>
      <div className='flex justify-between items-center'>
        <button className='bg-blue-500 text-white p-3 py-2 rounded-md cursor-pointer mb-4' onClick={addBtnHandler}>+ Add Note</button>
        <div>
          <input type="text" onChange={(e) => searchNote(e)} className='border-2 border-gray-400 text-sm rounded-md px-3 py-2 min-w-[30rem]' placeholder='Search...' />
        </div>
        <div></div>
      </div>
      <form onSubmit={handleSubmit} className={`overflow-hidden transition-all duration ${showBox ? "h-[320px]" : "h-0"}`}>
        <div className='flex justify-end text-2xl'>
          {pinned ? 
          <BsFillPinAngleFill onClick={()=>setPinned(false)} />
          :
          <BsPinAngle onClick={()=>setPinned(true)} />
          }
        </div>
        <div className='mb-3'>
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
          <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} id="title" className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Title" required />
        </div>
        <div className='my-3'>
          <label htmlFor="note" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
          <textarea id="note" onChange={(e) => setDescription(e.target.value)} value={description} className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter Note..." required rows={5} ></textarea>
        </div>
        <button className='bg-blue-500 text-white px-5 py-2 rounded-md cursor-pointer mb-4'>{updatingNoteId !== "" ? "Update" : "Add"}</button>
      </form>

      <div>
        <h1 className='text-2xl font-bold'>Your Notes</h1>

        {/* <div className='px-2 my-3 grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] '> */}
        <div className=' my-3 '>

          {
            appData.loggedIn ? 
          <>
          {
            notes && notes.find((note) => note.pinned === true) !== undefined &&
          <>
          <h5 className='font-bold text-xs text-neutral-600 uppercase my-3'>Pinned</h5>
          <div className='px-2 columns-[5_250px] *:break-inside-avoid mb-10'>
            {
              notes && notes.map((note, index) => (
                note.pinned && <div key={index} className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
                  <div className='mb-3 border-b-2 border-gray-300 flex justify-between items-center'>
                    <h3 className='text-xl pb-1 font-semibold'>{note.title}</h3>
                    <div className='flex items-center gap-3'>
                      <LiaEditSolid onClick={()=>updateNote(note._id)} className='cursor-pointer text-xl' />
                      <GoTrash onClick={()=>deleteNote(note._id)} className='cursor-pointer' />
                    </div>
                  </div>
                  <p>{note.description}</p>
                </div>
              ))
            }
            {/* <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, voluptate minima illum ipsa consequuntur sed ea dignissimos? Et totam in sint temporibus aperiam explicabo dolorum velit id? Dicta, molestias optio!</p>
            </div>
            <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>icabo dolorum velit id? Dicta, molestias optio!</p>
            </div> */}
          </div>
          <h5 className='font-bold text-xs text-neutral-600 uppercase my-3'>Other</h5>
          </>
          }

          <div className='px-2 columns-[5_250px] *:break-inside-avoid'>
            {
              notes && notes.map((note, index) => (
                !note.pinned && <div key={index} className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
                  <div className='mb-3 border-b-2 border-gray-300 flex justify-between items-center'>
                    <h3 className='text-xl pb-1 font-semibold'>{note.title}</h3>
                    <div className='flex items-center gap-3'>
                      <LiaEditSolid onClick={()=>updateNote(note._id)} className='cursor-pointer text-xl' />
                      <GoTrash onClick={()=>deleteNote(note._id)} className='cursor-pointer' />
                    </div>
                  </div>
                  <p>{note.description}</p>
                </div>
              ))
            }
            {/* <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, velit obcaecati, nihil aut incidunt enim sit veniam, aliquam inventore ratione adipi adipisci dolore doloremque. Cumque, iste sequi, quae omnis cum vero aliquid inventore, facere error perspiciatis culpa eveniet illo rerum aperiam exercitationem et tae! Magnam iure at accusantium, error, ipsum eaque sunt nihil consectetur eligendi doloribus ducimus non, vitae dolorem animi. Voluptas recusandae architecto, ex provident excepturi expedita quis.</p>
            </div>
            <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisio!</p>
            </div>
            <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, voluptate minima illum ipsa consequuntur sed ea dignissimos? Et totam in sint temporibus aperiam explicabo dolorum velit id? Dicta, molestias optio!</p>
            </div>
            <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolores placeat! Minima quasi maxime nisi quidem incidunt nobis ab odio pariatur, exercitationem cupiditate tempore impedit! Corporis ea culpa veniam earum vitae provident ut impedit dolore, beatae distinctio doloribus quidem quod in fuga ad veritatis natus perferendis? Aliquid quos animi facere?</p>
            </div>
            <div className='h-fit mb-3 py-2 px-3 border border-gray-700 rounded-lg max-w-[17rem]'>
              <h3 className='text-xl mb-3 border-b-2 pb-1 border-gray-300 font-semibold'>Want to Learn</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, dolores placeat! Minima quasi maxime nisi quidem incidunt nobis ab odio pariatur, exercitationem cupiditate tempore impedit! Corporis ea culpa veniam earum vitae provident ut impedit dolore, beatae distinctio doloribus quidem quod in fuga ad veritatis natus perferendis? Aliquid quos animi facere?</p>
            </div> */}
          </div>
          </>
          : 
          <div className='w-full flex flex-col justify-center items-center py-10'>
            <div>
              <IoIosLogIn className='text-5xl' />
            </div>
            <h1 className='text-3xl font-semibold my-3'>Login to Add Notes</h1>
            <Link to="/login" className='text-blue-500 underline'> Login here </Link>
          </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Todo