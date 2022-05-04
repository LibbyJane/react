import { useEffect, useState } from 'react'
import { projectAuth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, updateDoc } from 'firebase/firestore'
import { signInWithEmailAndPassword } from 'firebase/auth'

export const useLogin = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const login = async (email, password) => {
        console.log('log in', email, password)
        setError(null)
        setIsPending(true)

        try {

            const res = await signInWithEmailAndPassword(projectAuth, email, password)
            console.log('login res', res)

            await updateDoc(doc(db, 'users', res.user.uid), {
                online: true
            });

            dispatch({ type: 'LOGIN', payload: res.user })

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

    useEffect(() => {
        return () => setIsCancelled(true)
    }, [])

    return { login, isPending, error }
}