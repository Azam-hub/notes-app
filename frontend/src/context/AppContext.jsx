import { createContext, useEffect, useState } from "react";
import api from "../config/api";


const AppContext = createContext()

const AppContextProvider = ({children}) => {

  const [user, setUser] = useState({})
  const [loggedIn, setLoggedIn] = useState(null)

  
  
  const checkAuth = async () => {
    try {
      const { data } = await api.get("/auth/get-profile");
      if (data.success) {
        setLoggedIn(true)
        setUser(data.data)
      }
    } catch (error) {
      console.log(error.response);
      setLoggedIn(false)
      setUser({})
    }
  }
  
  const value = {
    loggedIn,
    user,
    checkAuth,
  }

  useEffect(() => {
    checkAuth()
  }, [])
  

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}

export {
  AppContextProvider,
  AppContext
}