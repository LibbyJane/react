import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
    // console.log('themeReducer action', action)
    switch (action.type) {
        case 'CHANGE_COLOR':
            return { ...state, color: action.payload }
        case 'CHANGE_MODE':
            return { ...state, mode: action.payload }
        default:
            return state
    }
}

export function ThemeProvider({ children }) {
    const [state, dispatch] = useReducer(themeReducer, {
        color: 'red',
        mode: 'light'
    })

    const changeColor = (color) => {
        dispatch({ type: 'CHANGE_COLOR', payload: color })
    }

    const changeMode = (mode) => {
        dispatch({ type: 'CHANGE_MODE', payload: mode })
    }

    return (
        <ThemeContext.Provider value={{ ...state, changeColor, changeMode }}>
            {children}
        </ThemeContext.Provider>
    )
}

// simple version, without reducers
// import { createContext} from 'react'

// export const ThemeContext = createContext()

// export function ThemeProvider({ children }) {
//     return (
//         <ThemeContext.Provider value={{color: 'var(--green)'}}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }