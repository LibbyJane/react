import { projectFirestore } from '../../firebase/config'
import { useState, useEffect } from 'react'

import RecipeList from '../../components/RecipeList'
import LoadingIcon from '../../components/Loading.js'

import './Home.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setIsPending(true)

    const unsub = projectFirestore.collection('recipes').onSnapshot(snapshot => {
      if (snapshot.empty) {
        setError('No recipes to load')
      } else {
        let results = []
        snapshot.docs.forEach(doc => {
          // console.log(doc)
          results.push({ ...doc.data(), id: doc.id })
        })
        setData(results)
      }
      setIsPending(false)
    }, err => {
      setError(err.message)
      setIsPending(false)
    })

    return () => unsub()
  }, [])

  return (
    <div className="home">

      {error && <p className="error">{error}</p>}
      {isPending && <LoadingIcon />}
      {/* {recipes && recipes.map(recipe => (
        <h2 key={recipe.id}>{recipe.title}</h2>
      ))} */}
      {!isPending && data && <RecipeList recipes={data} />}
    </div>
  )
}

// //Firebase version (without  realtime)

// import { projectFirestore } from '../../firebase/config'
// import { useState, useEffect } from 'react'

// import RecipeList from '../../components/RecipeList'
// import LoadingIcon from '../../components/Loading.js'

// import './Home.css'

// export default function Home() {
//   const [data, setData] = useState(null)
//   const [isPending, setIsPending] = useState(false)
//   const [error, setError] = useState(false)

//   useEffect( () => {
//     setIsPending(true)
//     projectFirestore.collection('recipes').get().then((snapshot) => {
//       if (snapshot.empty) {
//         setError('No recipes to load')
//       } else {
//         let results=[]

//         snapshot.docs.forEach(doc => {
//           results.push({id: doc.id, ...doc.data()})
//         })

//         setData(results)
//       }
//       setIsPending(false)
//     }).catch(err => {
//       setError(err.message)
//       setIsPending(false)
//     })
//   }, [])

//   return (
//     <div className="home">

//       {error && <p className="error">{error}</p>}
//       {isPending && <LoadingIcon />}
//       {/* {recipes && recipes.map(recipe => (
//         <h2 key={recipe.id}>{recipe.title}</h2>
//       ))} */}
//       {!isPending && data && <RecipeList recipes={data} />}
//     </div>
//   )
// }



// // Json server version

// import { useFetch } from '../../hooks/useFetch'
// import RecipeList from '../../components/RecipeList'
// import LoadingIcon from '../../components/Loading.js'

// import './Home.css'

// export default function Home() {
//   const { data, isPending, error } = useFetch('http://localhost:3001/recipes')

//   return (
//     <div className="home">
//       {error && <p className="error">{error}</p>}
//       {isPending && <LoadingIcon />}
//       {/* {recipes && recipes.map(recipe => (
//         <h2 key={recipe.id}>{recipe.title}</h2>
//       ))} */}
//       {!isPending && data && <RecipeList recipes={data} />}
//     </div>
//   )
// }