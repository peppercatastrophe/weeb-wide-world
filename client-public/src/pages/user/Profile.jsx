import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import sha256 from "js-sha256"
import { 
  setDislikes,
  setLikes, 
  setProfilePictureUrl, 
  setUserEmail, 
  setUserFullName, 
  setUserId } from "../../features/anime/userSlicer"
import { useNavigate } from "react-router-dom"
import instance from "../../configs/instance"

export default function Profile() {

  const user = useSelector(state => state.user)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const headers = { 
    Authorization: `Bearer ${localStorage.getItem('access_token')}` 
  }

  async function fetchProfilePicture(email) {
    try {
      let hashedEmail = sha256(user.email)
      dispatch(setProfilePictureUrl('http://gravatar.com/avatar'+hashedEmail))
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchLikesDislikes(userId) {
    try {
      const resLikes = await instance.get(`/user/${userId}/likes`, { headers })
      const resDislikes = await instance.get(`/user/${userId}/dislikes`, { headers })
      dispatch(setLikes(resLikes.data))
      dispatch(setDislikes(resDislikes.data))
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // TODO: showError
      } else console.log(error);
    }
  }

  function onClickEditBtn() {
    navigate(`/user/${user.userId}/edit`)
  } 

  async function onClickDeleteLike(AnimeId) {
    try {
      const delRes = await instance.delete('/like/'+AnimeId, { headers })
      if (delRes) fetchLikesDislikes(user.userId)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // TODO: showError
      } else console.log(error);
    }
  }
  
  async function onClickDeleteDislike(AnimeId) {
    try {
      const delRes = await instance.delete('/dislike/'+AnimeId, { headers })
      if (delRes) fetchLikesDislikes(user.userId)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        // TODO: showError
      } else console.log(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchLikesDislikes(user.userId)
    }, 500);
    
  }, [])
  
  // ==========================================================================
  // ==========================================================================
  // ==========================================================================
  return (
    <>
      <div className="m-3 d-flex flex-row">
        <div className="" style={{height: '80px', width: '80px', background: '#888'}}>
          {/* profile picture */}
          { (!user.loading && user.profilePictureUrl) && 
            <img src={user.profilePictureUrl} alt="" />
          }
        </div>

        <div className="ms-3">
          <div className="">
            Nama: { (!user.loading) && user?.userFullName }
          </div>
          <div className="">
            Email: { (!user.loading) && user?.userEmail }
          </div>
          <div>
            <button 
              className="btn btn-primary"
              onClick={onClickEditBtn}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Likes */}
      <div className="m-3 mt-5">
        <h5>Liked Anime(s)</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

            { (user.likes.length > 0) && user.likes.map( (el) => {
              return <tr key={el.id}>
                <td>{el.animeTitle}</td>
                <td>
                <button 
                  className="btn btn-danger"
                  onClick={()=>onClickDeleteLike(el.AnimeId)}
                >
                  Remove
                </button>
              </td>
              </tr>
            } )}

          </tbody>
        </table>
      </div>
      
      {/* Dislikes */}
      <div className="m-3 mt-5">
        <h5>Disliked Anime(s)</h5>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>

          { (user.dislikes.length > 0) && user.dislikes.map( (el) => {
              return <tr key={el.id}>
                <td>{el.animeTitle}</td>
                <td>
                <button 
                  className="btn btn-danger"
                  onClick={()=>onClickDeleteDislike(el.AnimeId)}
                >
                  Remove
                </button>
              </td>
              </tr>
            } )}

          </tbody>
        </table>
      </div>
    </>
  )
}
