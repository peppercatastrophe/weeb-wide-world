import Navbar from './components/Navbar'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { 
  setIsLoggedIn, 
  hasLoggedIn, 
  hasLoggedOut, 
  setLoading,
  setUserId,
  setUserEmail,
  setUserFullName,
  setProfilePictureUrl,
  setLikes,
  setDislikes, 
} from './features/anime/userSlicer'
import instance from './configs/instance'
import { sha256 } from 'js-sha256'

function App() {
  
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const dispatch = useDispatch()

  const afterLogin = () => {
    // trigger
  }

  async function fetchUser() {
    if (localStorage.getItem('access_token')) {
      try {
        dispatch(setLoading(true))
        const response = await instance('/user', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        const resLikes = await instance(`/user/${response.data.id}/likes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        const resDislikes = await instance(`/user/${response.data.id}/dislikes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`
          }
        })
        dispatch(setIsLoggedIn(true))
        dispatch(setUserId(response.data.id))
        dispatch(setUserEmail(response.data.email))
        dispatch(setUserFullName(response.data.fullName))
        dispatch(setLikes(resLikes.data))
        dispatch(setDislikes(resDislikes.data))
        let hashedEmail = await sha256(response.data.email)
        dispatch(setProfilePictureUrl('http://gravatar.com/avatar/'+hashedEmail))
      } catch (error) {
        if(error.response) {
          console.log(error.response.data)
        } else console.log(error)
      } finally {
        dispatch(setLoading(false))
      }
    }
  }

  useEffect(() => {
    if (!isLoggedIn && localStorage.getItem('access_token')) {
      fetchUser()
    }

    if (!localStorage.getItem('access_token')) {
      hasLoggedOut()
    }
  
    return () => {
      // cleanup code
    }
  }, [isLoggedIn])
  
  
  return (
    <>
    <header>
      <Navbar functions={{hasLoggedIn, hasLoggedOut}}/>
    </header>

    <main>
      <Outlet />
    </main>
    </>
  )
}

export default App
