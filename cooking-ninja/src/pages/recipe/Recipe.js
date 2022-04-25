import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch'
import LoadingIcon from '../../components/Loading.js'

import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const history = useHistory()
  const {error, isPending, data:recipe } = useFetch('https://localhost:3001/recipes/' + id) // json server isn't working

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        // history.goBack()
        history.push('/')
      }, 2000)
    }
  }, [error, history])


  return (
    <section className="recipe">
      {isPending && <LoadingIcon />}
      {error && <p>{error}</p>}
      {recipe && !isPending && (
        <>
          <h1 className="page-title">{recipe.title}</h1>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </section>
  )
}
