import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'
import Searchbar from './Searchbar'

import './Navbar.css'


export default function Navbar() {
  const { color, changeColor } = useTheme()

  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          Cook It
        </Link>
        <Searchbar />
        <Link to="/create" className='btn-outlined'>Create Recipe</Link>
      </nav>
    </div>
  )
}

// If we didn't have a 'useTheme' hook -
// import { Link } from 'react-router-dom'
// import { useContext } from 'react'
// import { ThemeContext } from '../context/ThemeContext'

// import Searchbar from './Searchbar'

// import './Navbar.css'


// export default function Navbar() {
//   const { color } = useContext(ThemeContext)

//   return (
//     <div className="navbar" style={ {background: color}}>
//       <nav>
//         <Link to="/" className="brand">
//           Cooking Ninja
//         </Link>
//         <Searchbar />
//         <Link to="/create">Create Recipe</Link>
//       </nav>
//     </div>
//   )
// }