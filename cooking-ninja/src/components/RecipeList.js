import { projectFirestore } from '../firebase/config'
import { Link } from 'react-router-dom'

import deleteIcon from '../assets/delete-icon.svg'

import './RecipeList.css'

export default function RecipeList({ recipes }) {
  const handleClick = (id) => {
    projectFirestore.collection('recipes').doc(id).delete()
  }

  if (recipes.length === 0) {
    return <p className="error">No recipes to load.</p>
  }
  return (
    <ul className="recipe-list">
    {recipes.map(recipe => (
      <li key={recipe.id} className="card">
          <Link to={`/recipes/${recipe.id}`}>
            <h3>{recipe.title}</h3>
            <h4>{recipe.cookingTime} to make.</h4>
            <p>{recipe.method.substring(0, 100)}&hellip;</p>
            <button className="btn" type="button">Cook This</button>
          </Link>
          <button
            className="delete"
            type="button"
            onClick={() => handleClick(recipe.id)}
          >
            <img
              className="icon-delete"
              src={deleteIcon}
              alt="delete icon"
            />
          </button>
      </li>
    ))}
    </ul>
  )
}