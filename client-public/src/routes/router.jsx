import { Navigate, createBrowserRouter, redirect } from 'react-router-dom'
import App from '../App.jsx'
import Login from '../pages/Login.jsx'
import Register from '../pages/Register.jsx'
import Home from '../pages/Home.jsx'
import AnimeDetail from '../pages/anime/AnimeDetail.jsx'
import AnimeRecommendation from '../pages/anime/AnimeRecommendation.jsx'
import Profile from '../pages/user/Profile.jsx'
import EditProfile from '../pages/user/EditProfile.jsx'



function hasAccessToken() {
  const access_token = localStorage.getItem('access_token')
  if (localStorage.getItem('access_token')) {
    return null
  } else {
    return redirect('/login')
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'login',
        element: <Login />,
        loader: () => {
          const access_token = localStorage.getItem('access_token')
          if (access_token) {
            return redirect('/home')
          } else return null
        },
      },
      {
        path: 'register',
        element: <Register />,
        // loader: () => {
        //   if (access_token == null) {
        //     return redirect('/')
        //   } else return null
        // },
      },
      {
        path: 'home',
        element: <Home />,
        loader: hasAccessToken
      },
      {
        path: 'anime/:id',
        element: <AnimeDetail />,
        loader: hasAccessToken
      },
      {
        path: 'recommendation',
        element: <AnimeRecommendation />,
        loader: hasAccessToken
      },
      {
        path: 'user/:id',
        element: <Profile />,
        loader: hasAccessToken,
      },
      {
        path: 'user/:id/edit',
        element: <EditProfile />,
        loader: hasAccessToken,
      },
    ]
  }
])

export default router