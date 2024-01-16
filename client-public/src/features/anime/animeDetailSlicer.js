import { createSlice } from '@reduxjs/toolkit'
import axios from '../../configs/instance' ; import fs from 'fs/promises'

const initialState = {
  id: null,
  animeDetail: null,
  animeDetailLoading: true
}

function set(key) {
  return (state, action) => {
    state[key] = action.payload
  }
}

export const animeDetailSlice = createSlice({
  name: 'animeDetail',
  initialState,
  reducers: {
    setId: set('id'),
    setAnimeDetail: set('animeDetail'),
    setAnimeDetailLoading: set('animeDetailLoading'),
  }
})

export const { setId, setAnimeDetail, setAnimeDetailLoading } = animeDetailSlice.actions

export function fetchAnimeDetail(id) {
  return async (dispatch) => {
    try {
      dispatch(setAnimeDetailLoading(true))
      const { data } = await axios.get('https://kitsu.io/api/edge/anime/' + id)
      // temporary for testing
      // const { data } = await axios.get('https://kitsu.io/api/edge/anime/' + id)
      if (data) {
        console.log(data)
        dispatch(setAnimeDetail(data))
        dispatch(setAnimeDetailLoading(false))
      }
    } catch (error) {
      throw error
    }
  }
}

export function cleanUpAnimeDetail() {
  return (dispatch) => {
    dispatch(setAnimeDetailLoading(true))
    dispatch(setAnimeDetail({}))
  }
}

export default animeDetailSlice.reducer