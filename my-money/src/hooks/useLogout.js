import { useState, useEffect } from 'react'
import { projectAuth } from '../firebase/config'
import { useAuthContext } from './useAuthContext'


export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    console.log('1) useLogout fn, isCancelled?', isCancelled)

    const logout = async () => {
        setError(null)
        setIsPending(true)

        try {
            console.log('3) useLogout try, isCancelled?', isCancelled)
            await projectAuth.signOut()
            console.log('4) useLogout dispatch LOGOUT')
            dispatch({ type: 'LOGOUT' })

            if (!isCancelled) {
                setIsPending(false)
                setError(null)
            }
        }
        catch (err) {
            if (!isCancelled) {
                setError(err.message)
                setIsPending(false)
            }
        }
    }

    useEffect( () => {
        console.log('2) use logout use effect, setIsCancelled(true)')
        return () => setIsCancelled(true)
    }, [])

    return { logout, error, isPending }
}