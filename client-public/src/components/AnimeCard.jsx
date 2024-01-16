import { Link } from 'react-router-dom'
import instance from '../configs/instance'
import { useSelector } from 'react-redux'
import { useState } from 'react'

export default function AnimeCard(props) {

  const userId = useSelector(state => state.user.userId)
  const [likes, setLikes] = useState(0)
  const [dislikes, setDislikes] = useState(0)
  // TODO: set 'likes' and 'dislikes' using redux, data from server

  async function onClickLike(){
    // add Like
    try {
      const res = await instance.post('/like/'+props.data.id, {
        AnimeId: props.data.id,
        UserId: userId,
        animeTitle: props.data.attributes.titles.en,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res) {
        setLikes(prev=>prev+1)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // TODO: showError
      } else console.log(error)
    }
  }

  async function onClickDislike(){
    // add Dislike
    try {
      const res = await instance.post('/dislike/'+props.data.id, {
        AnimeId: props.data.id,
        UserId: userId,
        animeTitle: props.data.attributes.titles.en,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access_token')}`
        }
      })
      if (res) { 
        setDislikes(prev=>prev+1)
      }
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // TODO: showError
      } else console.log(error)
    }
  }

  // ==========================================================================
  // ==========================================================================
  // ==========================================================================
  return (
    <>
      <div className="col">
        <div className="card">
          <Link to={`/anime/${props.data.id}`}>
            <img
              src={ props.data && props.data.attributes.posterImage.tiny } 
              className="card-img-top"
            />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{ props.data && props.data.attributes.titles.en }</h5>
            <p className="card-text">
              { props.data && props.data.attributes.titles.ja_jp }
            </p>
          </div>
          <div className="card-footer text-body-secondary">
            <button 
              className="btn btn-primary w-100 mb-1"
              onClick={onClickLike}
            >
              Like: {likes}
            </button>
            <button 
              className="btn btn-secondary w-100"
              onClick={onClickDislike}
            >
              Dislike: {dislikes}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}