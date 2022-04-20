import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import './TripList.css'

export default function TripList() {
  const [url, setUrl] = useState('https://localhost:3000/data/db-eu.json')
  const { data: trips, isPending, error } = useFetch(url)

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      {isPending && <div>Loading trips...</div>}
      {error && <div>{error}</div>}
      <ul>
        {trips && trips.trips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button onClick={() => setUrl('https://localhost:3000/data/db-eu.json')}>
          European Trips
        </button>
        <button onClick={() => setUrl('https://localhost:3000/data/db.json')}>
          All Trips
        </button>
      </div>
    </div>
  )
}