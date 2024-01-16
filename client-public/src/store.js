import { configureStore } from '@reduxjs/toolkit'
import animeReducer from './features/anime/animeSlicer'
import animeDetailReducer from './features/anime/animeDetailSlicer'
import userReducer from './features/anime/userSlicer'

export default configureStore({
  reducer: {
    anime: animeReducer,
    animeDetail: animeDetailReducer,
    user: userReducer
  }
})