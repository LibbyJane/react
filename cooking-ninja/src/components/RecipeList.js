import { Link } from 'react-router-dom'

// styles
import './RecipeList.css'

export default function RecipeList({ recipes }) {
  return (
    <ul className="recipe-list">
      {recipes.map(recipe => (
        <li key={recipe.id} className="card">
            <Link to={`/recipes/${recipe.id}`}>
                <h3>{recipe.title}</h3>
            <h4>{recipe.cookingTime} to make.</h4>
            <p>{recipe.method.substring(0, 100)}&hellip;</p>
            <button type="button">Cook This</button>
            </Link>
        </li>
      ))}
    </ul>
  )
}