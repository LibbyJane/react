import React from 'react'
import styles from './EventList.module.css' // scoped styles

export default function EventList({events, handleDeleteEvent}) {
    return (
        <ul className={styles['events-list']}>
            {
                events.map((event, index) => (
                    <li key={event.id}>
                        <h2>{event.title}</h2>
                        <button onClick={() => handleDeleteEvent(event.id)}>Delete</button>
                    </li>
                    // <React.Fragment key={id}>
                    //     <h2>{title}</h2>
                    //     <button onClick={() => handleDeleteEvent(id)}>Delete</button>
                    // </React.Fragment>
                ))
            }
        </ul>
    )
}
