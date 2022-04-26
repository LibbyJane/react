import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import LoadingIcon from '../../components/Loading.js'

import './Recipe.css'

export default function Recipe() {
  const { id } = useParams()
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(null)
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').doc(id).onSnapshot(doc => {
      if (doc.exists) {
        setRecipe(doc.data())
      } else {
        setError(`Could not find that recipe`)
      }
      setIsPending(false)
    })

    return () => unsub()

  }, [id])

  // const handleClick = () => {
  //   projectFirestore.collection('recipes').doc(id).update({
  //     title: 'Grated Carrot Salad'
  //   })
  // }


  return (
    <section className="recipe">
      {isPending && <LoadingIcon />}
      {error && <p>{error}</p>}
      {recipe && !isPending && (
        <>
          <h1 className="page-title">{recipe.title}</h1>
          <p>Takes {recipe.cookingTime} to make.</p>
          <h4>Ingredients</h4>
          <ul>
            {recipe.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          {/* <button onClick={handleClick}>Update me</button> */}
        </>
      )}
    </section>
  )
}

// Json server version
// import { useEffect } from "react"
// import { useHistory, useParams } from "react-router-dom"
// import { useFetch } from '../../hooks/useFetch'
// import LoadingIcon from '../../components/Loading.js'

// import './Recipe.css'

// export default function Recipe() {
//   const { id } = useParams()
//   const history = useHistory()
//   const {error, isPending, data:recipe } = useFetch('https://localhost:3001/recipes/' + id) // json server isn't working

//   useEffect(() => {
//     if (error) {
//       setTimeout(() => {
//         // history.goBack()
//         history.push('/')
//       }, 2000)
//     }
//   }, [error, history])


//   return (
//     <section className="recipe">
//       {isPending && <LoadingIcon />}
//       {error && <p>{error}</p>}
//       {recipe && !isPending && (
//         <>
//           <h1 className="page-title">{recipe.title}</h1>
//           <p>Takes {recipe.cookingTime} to make.</p>
//           <h4>Ingredients</h4>
//           <ul>
//             {recipe.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
//           </ul>
//           <p className="method">{recipe.method}</p>
//         </>
//       )}
//     </section>
//   )
// }
