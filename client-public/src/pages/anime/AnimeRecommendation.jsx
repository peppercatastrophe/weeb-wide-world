import { Link } from 'react-router-dom'

export default function AnimeRecommendation() {
  return (
    <>
      <Link className="btn btn-primary mx-3 mt-3" to='/home'>Back</Link>
      <div className="m-3">
        <h5>
          Here's our anime recommendations based on your Likes and Dislikes:
        </h5>
      </div>
    </>
  )
}