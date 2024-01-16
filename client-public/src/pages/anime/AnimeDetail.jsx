import { useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useParams, Link } from 'react-router-dom'
import { cleanUpAnimeDetail, fetchAnimeDetail } from "../../features/anime/animeDetailSlicer"

export default function AnimeDetail() {

  const animeDetail = useSelector(state => state.animeDetail.animeDetail)
  const animeDetailLoading = useSelector(state => state.animeDetail.animeDetailLoading)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    cleanUpAnimeDetail()
    let animeId = location.pathname.split('/')[2]
    dispatch(fetchAnimeDetail(animeId))
    console.log('useEffect');
  
    return () => {
      // cleanup code here
      cleanUpAnimeDetail()
    }
  }, [])

  if (animeDetailLoading) {
    return (
      <>
        <div className="text-center w-100">Loading...</div>
      </>
    )
  }

  return (
    <>
      <Link className="btn btn-primary mx-3 mt-3" to='/home'>Back</Link>
      <div className="m-3 row">
        <div className="col">
          <img src={ !animeDetailLoading && animeDetail.data.attributes.posterImage.large }
          />
        </div>

        <div className="col px-5">
          <div className="row">
            <h1>{ !animeDetailLoading && animeDetail.data.attributes.titles.en }

            </h1>
          </div>
          <div className="row">
            Jpn Title: { !animeDetailLoading && animeDetail.data.attributes.titles.ja_jp }
          </div>
          <div className="row pt-4">
            Synopsis:
          </div>
          <div className="row">
          { !animeDetailLoading && animeDetail.data.attributes.synopsis }
          </div>
          <div className="row pt-4">
            Kitsu Rating: { !animeDetailLoading && animeDetail.data.attributes.averageRating }
          </div>
          <div className="row pt-4">
            <button className="btn btn-primary w-10 mb-1">Like: 0</button>
          </div>
          <div className="row pt-2">
            <button className="btn btn-secondary w-10">Dislike: 0</button>
          </div>
        </div>
      </div>
    </>
  )
}