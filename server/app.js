require('dotenv').config()
const cors = require('cors')
const express = require('express')
const ErrorHandler = require('./middlewares/error-handler')
const app = express()
const PORT = 3000

const UserController = require('./controllers/User')
const authentication = require('./middlewares/authentication')
const LikeDislikeController = require('./controllers/LikeDislike')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (a, res) => {
  res.status(200).json({message: 'OK'})
})
app.post('/login', UserController.login)
app.post('/register', UserController.register)
app.post('/googleLogin', UserController.googleLogin)
app.get('/user/:id', UserController.getUser)
app.patch('/user/:id', authentication, UserController.updateUser)
app.get('/user', authentication, UserController.getUserByToken)
app.get('/user/:id/likes', authentication, LikeDislikeController.GetLikes)
app.get('/user/:id/dislikes', authentication, LikeDislikeController.GetDislikes)
app.post('/like/:AnimeId', authentication, LikeDislikeController.AddLike)
app.post('/dislike/:AnimeId', authentication, LikeDislikeController.AddDislike)
app.delete('/like/:AnimeId', authentication, LikeDislikeController.deleteLike)
app.delete('/dislike/:AnimeId', authentication, LikeDislikeController.deleteDislike)

// error handler
app.use(ErrorHandler)

app.listen(PORT, () => {
  console.log(`currently listening to port ${PORT}`)
})