import styles from './Error.scss'

export default function Error( {message} ) {
    return (
        <p className={styles.error}>
            {message}
        </p>
    )
}