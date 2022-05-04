import { useEffect, useState, useRef } from "react"
import { collection, onSnapshot, query, where, limit } from 'firebase/firestore'
import { db } from "../firebase/config"

export const useCollection = (coll, _query, _orderBy) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)

    // if we don't use a ref --> infinite loop in useEffect
    // _query is an array and is "different" on every function call
    const q = useRef(_query).current
    const ob = useRef(_orderBy).current

    useEffect(() => {
        let ref = collection(db, coll)

        if (q) {
            ref = query(ref, where(...q, ob), limit(100));
        }

        onSnapshot(ref, (snapshot) => {
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id })
            })

            // update state
            setDocuments(results)
            setError(null)
        }, error => {
            console.log(error)
            setError('could not fetch the data')
        })

        // const unsubscribe = getDocs(ref)
        //     .then((snapshot) => {
        //         let results = []
        //         snapshot.docs.forEach(doc => {
        //             results.push({ ...doc.data(), id: doc.id })
        //         });

        //         // update state
        //         setDocuments(results)
        //         setError(null)
        //     }, error => {
        //         console.log(error)
        //         setError('could not fetch the data')
        //     })

        // // unsubscribe on unmount
        // return () => unsubscribe()

    }, [coll, q, ob])

    return { documents, error }
}


