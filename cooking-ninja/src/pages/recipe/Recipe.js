import { useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { useFetch } from '../../hooks/useFetch'

import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  // const {error, isPending, data:recipe } = useFetch('https://localhost:300/recipes/' + id) // json server isn't working
  const resp = useFetch('./../data/db.json')
  let recipe = null
  let isPending = resp.isPending
  let error = resp.error
  const history = useHistory()

  if (resp.data) {
    // fudging some of this because json server isn't working
    console.log('resp', resp)
    let recipes = resp.data.recipes
    recipe = recipes.filter(r => r.id === id)[0];
    console.log('recipe', recipe)

    if (!recipe) {
        resp.error = 404;
    }
  }

  useEffect(() => {
    if (resp.error) {
      setTimeout(() => {
        // history.goBack()
        history.push('/')
      }, 2000)
    }
  }, [resp.error, history])


  return (
    <section className="recipe">
      {isPending && <p>Loading&hellip</p>}
      {error && <p>{error}</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing.index}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </section>
  )
}
