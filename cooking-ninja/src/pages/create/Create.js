import { useState, useRef, useEffect} from 'react'
import { useFetch } from '../../hooks/useFetch'
import { useHistory } from 'react-router-dom'

import './Create.css'

export default function Create() {
  const [title, setTitle] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [method, setMethod] = useState('')
  const ingredientInput = useRef(null)

  const { postData, data, error } = useFetch('http://localhost:2000/recipes', 'POST')
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    postData({ title, ingredients, method, cookingTime: cookingTime + ' minutes' })
  }
  // redirect the user when we get data response
  useEffect(() => {
    if (data) {
      history.push('/')
    } else if (error) {
      console.log('error', error)
    }
  }, [data, error, history])

  const handleAddNewIngredient = (e) => {
    if (e && e.target && e.target.value) {
      const trigger = e.code ? e.code.toLowerCase() : e.type ? e.type.toLowerCase() : null

      if (trigger === 'enter' || trigger === 'blur') {
        let ingredient = e.target.value.trim();

        if (ingredient && !ingredients.includes(ingredient)) {
          setIngredients(prevIngredients => [...prevIngredients, ingredient])
        }
        ingredientInput.current.value = ''

        if (trigger !== 'blur') {
          ingredientInput.current.focus()
        }
      }
    }
  }

  return (
    <section className="create">
      <h1 className="page-title">Add a New Recipe {error} {data}</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="rec-title">Title</label>
        <input
          type="text"
          id="rec-title"
          name="rec-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="rec-ingredients">Ingredients</label>

        <div className="cols">
          <div className="col">
            <input
            type="text"
            id="rec-new-ingredient"
            name="rec-new-ingredient"
            ref={ingredientInput}
            onBlur={(e) => handleAddNewIngredient(e)}
            onKeyPress={(e) => handleAddNewIngredient(e)}
            />
          </div>
          <button
            type="button"
            onClick={handleAddNewIngredient()}
            className="btn">
              add
          </button>
        </div>

        <ul>
          {ingredients && (
            ingredients.map(ing => <li key={ing}>{ing}</li>)
          )}
        </ul>


        <label htmlFor="rec-cooking-time">Cooking time (in minutes)</label>
        <input
          type="number"
          id="rec-cooking-time"
          name="rec-cooking-time"
          value={cookingTime}
          onChange={(e) => setCookingTime(e.target.value)}
        />

        <label htmlFor="rec-method">Method</label>
        <textarea
          id="rec-method"
          name="rec-method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <button className="btn" onClick={handleSubmit}>submit</button>

      </form>
    </section>
  )
}
