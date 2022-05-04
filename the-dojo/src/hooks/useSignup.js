import { useState, useEffect } from 'react'
// storage for the user's avatar, firestore to make a document for the user
import { projectAuth, db } from '../firebase/config'
import { useAuthContext } from './useAuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (email, password, displayName, thumbnail) => {
        setError(null)
        setIsPending(true)

        try {

            const res = await createUserWithEmailAndPassword(projectAuth, email, password)

            if (!res) {
                throw new Error('Could not complete signup')
            }

            // Create a reference with an initial file path and name
            const storage = getStorage();
            const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`
            const storageRef = ref(storage, uploadPath);

            uploadBytes(storageRef, thumbnail).then((snapshot) => {
                console.log('snapshot', snapshot)
                console.log(' projectAuth.currentUser',  projectAuth.currentUser)

                getDownloadURL(storageRef)
                .then((url) => {
                    console.log('url', url)
                    updateProfile(projectAuth.currentUser, {
                        displayName: displayName, photoURL: url
                      }).then(() => {
                          console.log('update users collection')
                            setDoc(doc(db, 'users', res.user.uid), {
                                displayName: displayName, photoURL: url, online: true
                            });
                            dispatch({type: 'LOGIN', payload: res.user})
                      }).catch((error) => {
                        // An error occurred
                        // ...
                      });

                })
                .catch((error) => {
                    console.log('error', error)
                });
            });




            // const img = await projectStorage.ref(uploadPath).put(thumbnail)
            // const photoURL = await img.ref.getDownloadURL()

            // await res.user.updateProfile({ displayName, photoURL })

            // // create a user document
            // await db.collection('users').doc(res.user.uid).set({
            //     online: true,
            //     displayName,
            //     photoURL
            // })



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

    return { signup, error, isPending }
}