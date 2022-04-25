import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
import './Home.css'

export default function Home() {
  const { data, isPending, error } = useFetch('http://localhost:3001/recipes')

  return (
    <div className="home">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading…</p>}
      {/* {recipes && recipes.map(recipe => (
        <h2 key={recipe.id}>{recipe.title}</h2>
      ))} */}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}