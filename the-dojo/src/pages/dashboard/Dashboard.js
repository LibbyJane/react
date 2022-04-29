import { useCollection } from '../../hooks/useCollection'
import ProjectList from '../../components/ProjectList'
import Error from "../../components/Error"

import './Dashboard.css'

export default function Dashboard() {
    const { documents, error } = useCollection('projects')

    return (
        <section>
            <h2 className="page-title">Dashboard</h2>
            {documents && <ProjectList projects={documents} />}
            {error && (
                <Error message={error} />
            )}
        </section>
    )
}
