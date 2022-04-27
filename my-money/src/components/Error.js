// import errorIcon from '../assets/error-icon.svg'
import styles from './Error.module.css'


export default function Error( {message} ) {
    return (
        <p className={styles.error}>
            {/* <img
                className="icon-error"
                src={errorIcon}
                alt="error icon"
            /> */}
            {message}
        </p>
    )
}