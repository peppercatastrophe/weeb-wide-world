import { createSlice } from '@reduxjs/toolkit'
import axios from '../../configs/instance'

const initialState = {
  anime: [],
  loading: true
}

function set(key) {
  return (state, action) => {
    state[key] = action.payload
  }
}

export const animeSlice = createSlice({
  name: 'anime',
  initialState,
  reducers: {
    setAnime: set('anime'),
    setLoading: set('loading'),
  }
})

export const { setAnime, setLoading } = animeSlice.actions

export function fetchAnime() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get('https://kitsu.io/api/edge/anime?page%5Blimit%5D=5&page%5Boffset%5D=0')
      if (data) {
        console.log(data)
        dispatch(setAnime(data))
        dispatch(setLoading(false))
      }
    } catch (error) {
      throw error
    }
  }
}

export default animeSlice.reducer