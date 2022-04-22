import { useFetch } from '../../hooks/useFetch'
import RecipeList from '../../components/RecipeList'
import './Home.css'

export default function Home() {
  const { data, isPending, error } = useFetch('./data/db.json')
  const recipes = data && data.recipes ? data.recipes : []

  return (
    <div className="home">
      {/* {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading&hellip;</p>}
      {/* {recipes && recipes.map(recipe => (
        <h2 key={recipe.id}>{recipe.title}</h2>
      ))} */}
      {recipes.length && <RecipeList recipes={recipes} />}
    </div>
  )
}