import { createSlice } from '@reduxjs/toolkit'
import axios from '../../configs/instance'
import { sha256 } from 'js-sha256'

const initialState = {
  isLoggedIn: false,
  isSubscribed: false,
  userId: 0,
  userFullName: '',
  userEmail: '',
  profilePictureUrl: '',
  likes: [],
  dislikes: [],
  loading: true
}

function set(key) {
  return (state, action) => {
    state[key] = action.payload
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsLoggedIn: set('isLoggedIn'),
    setProfilePictureUrl: set('profilePictureUrl'),
    setUserId: set('userId'),
    setUserEmail: set('userEmail'),
    setUserFullName: set('userFullName'),
    setProfilePictureUrl: set('profilePictureUrl'),
    setLikes: set('likes'),
    setDislikes: set('dislikes'),
    setLoading: set('loading')
  }
})

export const { 
  setIsLoggedIn, 
  setProfilePictureUrl, 
  setUserId,
  setUserEmail,
  setUserFullName,
  setLikes,
  setDislikes,
  setLoading,
 } = userSlice.actions

export function hasLoggedIn(data) {
  return async (dispatch) => {
    try {
      dispatch(setIsLoggedIn(true))
      dispatch(setUserId(data.id))
      dispatch(setUserFullName(data.fullName))
      dispatch(setUserEmail(data.email))

      let hash = sha256(data.email)
      console.log(hash)
    } catch (error) {
      throw error
    }
  }
}

export function hasLoggedOut() {
  return (dispatch) => {
    dispatch(setIsLoggedIn(false))
  }
}

export default userSlice.reducer