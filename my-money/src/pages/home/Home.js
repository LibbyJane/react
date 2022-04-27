import { useAuthContext } from '../../hooks/useAuthContext'
import { useCollection } from '../../hooks/useCollection'

import Error from '../../components/Error'
import TransactionForm from './TransactionForm.js'
import TransactionList from './TransactionList.js'

import styles from './Home.module.css'

export default function Home() {
    const { user } = useAuthContext()
    const { documents, error } = useCollection(
        'transactions',
        ['uid', '==', user.uid],
        ['createdAt', 'desc']
    )

    console.log('documents', documents)
    return (
        // using both global "container" styles and home.module.css "container" styles
        <div className={`container ${styles.container}`}>
            <section className={styles.content}>
                {documents && <TransactionList transactions={documents} />}
                {error && <Error message={error} />}
            </section>
            <aside className={styles.sidebar}>
                <TransactionForm uid={user.uid} />
            </aside>
        </div>
    )
}
