import { useCollection } from '../../hooks/useCollection'
import NoteList from '../../components/NoteList'
import Error from "../../components/Error"

import './Dashboard.css'

export default function Dashboard() {
    const { documents, error } = useCollection('notes')

    return (
        <section>
            <h2 className="page-title">Dashboard</h2>
            {documents && <NoteList notes={documents} />}
            {error && (
                <Error message={error} />
            )}
        </section>
    )
}
