import { useFetch } from '../../hooks/useFetch'
import { useLocation } from 'react-router-dom'  // gives us the query string
import RecipeList from '../../components/RecipeList'
import LoadingIcon from '../../components/Loading.js'

import './Search.css'

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q')
  const url = 'http://localhost:3001/recipes?q=' + query
  const {error, isPending, data} = useFetch(url)

  return (
    <section>
      <h1 className="page-title">Recipes including "{query}"</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <LoadingIcon />}
      {!isPending && data && <RecipeList recipes={data} />}
    </section>
  )
}
