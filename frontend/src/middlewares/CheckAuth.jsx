import { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'

const CheckAuth = ({status, children}) => {
  // console.log(props);

  const {loggedIn} = useContext(AppContext)
  const navigate = useNavigate()

  // const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Don’t do anything until auth check is done
    if (loggedIn === null) return

    if (status === "should-loggedIn" && !loggedIn) {
      navigate("/login")
    }

    if (status === "should-not-loggedIn" && loggedIn) {
      navigate("/")
    }
  }, [loggedIn])
  
  if (loggedIn === null) return <Loading /> 
  
  return children
}

export default CheckAuth