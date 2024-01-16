import { useSelector } from 'react-redux'
import { 
  Link,
  NavLink,
  redirect,
  useLocation,
  useNavigate
 } from 'react-router-dom'
import { useEffect, useState } from 'react';
import IsSubscribed from './IsSubscribed';

function LogoutButton(props) {
  return (
    <>
      <button
        className='btn btn-danger'
        onClick={ () => {props.logoutFunc()} }
      >
        Logout
      </button>
    </>
  )
}

function LoginLink() {
  return (
    <>
      <li className="nav-item">
        <Link className="nav-link active" to="/login">
          Login
        </Link>
      </li>
    </>
  )
}

export default function AppNavbar() {

  const location = useLocation()

  const [trigger, setTrigger] = useState(0)
  const [isLoginPage, setIsLoginPage] = useState(false)
  const isLoggedIn = useSelector(state => state.user.isLoggedIn)
  const userId = useSelector(state => state.user.userId)

  const navigate = useNavigate()
  
  function logoutOnClick() {
    console.log('logout');
    localStorage.removeItem('access_token')

    navigate('/login')
  }
  
  useEffect(() => {
    if (location.pathname.slice('/')[1] == 'login') {
      setIsLoginPage(true)
    }
  
    return () => {
      
    }
  }, [])
  

  return (
    <>
      <nav className="navbar navbar-expand-sm bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            Weeb-Wide-World三
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-sm-0">
              
              {/* Login */}
              { (!localStorage.getItem('access_token')) && <LoginLink />}
              
              {/* Register */}
              { (!localStorage.getItem('access_token')) && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                </li>
              )}

              {/* Subscription Status */}
              { localStorage.getItem('access_token') && (
                <li className="nav-item">
                  <IsSubscribed />
                </li>
              )}

              {/* Recommendation */}
              { (localStorage.getItem('access_token')) && (
                <li className="nav-item">
                  <NavLink className={({isActive}) => isActive ? "nav-link active" :"nav-link"} to="/recommendation">
                    Recommendation
                  </NavLink>
                </li>
              )}
                
            </ul>

              { (localStorage.getItem('access_token')) &&
            <><div className='me-2'>
              <Link className="btn btn-primary" to={'/user/'+userId}>User Profile</Link>
            </div>
            <div>
               <LogoutButton logoutFunc={logoutOnClick} />
            </div></>
               }
          </div>
        </div>
      </nav>

    </>
  )
}