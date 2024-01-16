import { useEffect } from 'react'
import AnimeCard from '../components/AnimeCard'
import { useSelector, useDispatch } from 'react-redux'
import { setAnime, fetchAnime } from '../features/anime/animeSlicer'

export default function Home() {

  const animePlaceholder = {
    attributes: 
    {
      titles: 
      { 
        en : '<span class="placeholder col-6"></span>', 
        ja_jp : '<span class="placeholder col-6"></span>', 
      },
      description: '<span class="placeholder col-6"></span>'
    }
  }
  const anime = useSelector(state => state.anime.anime)
  const loading = useSelector(state => state.anime.loading)
  const dispatch = useDispatch()

  function loadPlaceholder() {

  }

  useEffect(() => {
    if (anime.length == 0) {
      dispatch(fetchAnime())
    }
  
    return () => {
      // cleanup code here
    }
  }, [])
  
  return (
    <>
      <div className="row row-cols-2 row-cols-sm-4 row-cols-lg-6 g-3 m-3">
        { (!loading) && anime.data.map( a => {
          // console.log(a);
          return <AnimeCard key={a.id} data={a} />
        })}
      </div>

    </>
  )
}