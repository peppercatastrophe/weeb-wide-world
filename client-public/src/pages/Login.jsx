import { 
  useEffect,
  useState 
} from 'react'
import axios from '../configs/instance'
import { Navigate, useNavigate } from 'react-router-dom'
import { 
  hasLoggedIn,
  setIsLoggedIn, 
  setUserId, 
  setUserFullName, 
  setUserEmail, 
  setProfilePictureUrl 
} from '../features/anime/userSlicer'
import { useDispatch, useSelector } from 'react-redux'
import { sha256 } from 'js-sha256'


export default function Login() {

  // will trigger Navigate to '/home' if true
  const [loginSuccess, setLoginSuccess] = useState(false)

  const dispatch = useDispatch()

  async function setUserData(user) {
    dispatch(setIsLoggedIn(true))
    dispatch(setUserId(user.id))
    dispatch(setUserFullName(user.fullName))
    dispatch(setUserEmail(user.email))
    let hashedEmail = await sha256(user.email)
    dispatch(setProfilePictureUrl('http://gravatar.com/avatar/'+hashedEmail))
  }

  async function login(json) {
    try {
      const { data } = await axios.post('/login', json)
      if (data) {
        // TODO: showSuccess
        setUserData(data)
        localStorage.setItem('access_token', data.access_token)
        // will trigger Navigate to '/home' if true
        setLoginSuccess(true)
      }
    } catch (error) {
      console.log(error)
      // TODO: showError
    }
  }
  
  function onSubmitLogin(e) {
    e.preventDefault()
    const form = e.target
    const formData = new FormData(form)
    const formJson = Object.fromEntries(formData.entries())
  
    login(formJson)
  }

  async function handleCredentialResponse(credRes) {
    console.log(credRes, '<-- credential response');
    try {
      const { data } = await axios.post('/googleLogin', {
        token: credRes.credential
      })
      if (data) {
        localStorage.setItem('access_token', data.access_token)
        setLoginSuccess(true)
        setUserData(data)
      }
    } catch (error) {
      console.log(error)
      // TODO: show error
    }
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      { theme: "outline", size: "large" }  // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  }, [])
  
  return (
    <>
      { loginSuccess && <Navigate to='/home' /> }

      <form className="m-3" onSubmit={onSubmitLogin}>
        {/* Email */}
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
          />
        </div>

        {/* Login Button */}
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
        <div id="google-login" className='m-3'></div>
    </>
  )
}