import { useState, useEffect } from 'react'
// storage for the user's avatar, firestore to make a document for the user
import { projectAuth, projectStorage } from '../firebase/config'
import { useFirestore } from './useFirestore'



export const useAddImage = () => {
    const [isCancelled, setIsCancelled] = useState(false)
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const [newImage, setNewImage] = useState(null)

    const addImage = async (uploadPath, image) => {
        console.log('add image,', uploadPath, image)
        setError(null)
        setIsPending(true)

        try {
            if (image) {

                const img = await projectStorage.ref(uploadPath).put(image)

                const ni = {
                    URL: await img.ref.getDownloadURL(),
                    name: image.name
                }

                setNewImage(ni);
                console.log('set', newImage)
            }


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

    console.log('return,', newImage)
    return { addImage, newImage, isPending, error}
}