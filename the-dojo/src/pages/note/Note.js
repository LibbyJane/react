import { db } from '../../firebase/config'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Loading from '../../components/Loading'
import NoteDetail from './NoteDetail'
import NoteComments from './NoteComments'

import './Note.css'

export default function Note({setPageTitle}) {
    const { id } = useParams()
    const [isPending, setIsPending] = useState(false)
    const [error, setError] = useState(null)
    const [note, setNote] = useState(null)

    useEffect(() => {
        setIsPending(true)

        const unsubscribeFromRealtimeData = db.collection('notes').doc(id).onSnapshot(doc => {
            if (doc.exists) {
                setNote(doc.data())
            } else {
                setError(`Could not find that note`)
            }
            setIsPending(false)
        })

        return () => unsubscribeFromRealtimeData()

    }, [id])

    console.log('note', note)

    if (error) {
        return <p>{error}</p>
    }

    return (
        <section className='note'>
            {isPending && <Loading />}
            {!isPending && note &&
                <>
                    <NoteDetail note={note} id={id} />
                    <NoteComments note={note} id={id} />
                </>
            }

        </section>
    )
}
