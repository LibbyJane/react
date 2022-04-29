import styles from './Error.css'

export default function Error( {message} ) {
    return (
        <p className={styles.error}>
            {message}
        </p>
    )
}