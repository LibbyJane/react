import { useState } from 'react'

import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'
import NoteList from '../../components/NoteList'
import Error from "../../components/Error"
import FilterList from "../../components/FilterList"

import './Dashboard.css'

export default function Dashboard({setPageTitle}) {
    const { user } = useAuthContext()
    const filters = ['all', 'saved', 'has image']
    const [filter, setFilter] = useState('all')
    setPageTitle('Dashboard')

    const { documents, error } = useCollection(
        'notes',
        ['recipientsList', 'array-contains', {'id': user.uid}],
        ['createdAt', 'desc']
    )

    const changeFilter = (newFilter) => {
        setFilter(newFilter)
    }

    const selectedNotes = documents ? documents.filter( document => {
        switch (filter) {
            case 'all':
                return true
            case 'saved':
                return document.saved
            case 'mine':
                let assignedToMe = false
                document.assignedUsersList.forEach(u => {
                    if (u.id === user.uid) {
                        assignedToMe = true
                    }
                })
                return assignedToMe
            case 'has image':
                return document.noteImage
            case 'from':

            default:
                return true
        }
    }) : null

    return (
        <section>
            {documents && <FilterList filters={filters} changeFilter={changeFilter} />}
            {selectedNotes && <NoteList notes={selectedNotes} />}
            {error && (
                <Error message={error} />
            )}
        </section>
    )
}
