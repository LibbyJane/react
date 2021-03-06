import { useState, useEffect, useCallback } from 'react'
import './TripList.css'

export default function TripList() {
  const [trips, setTrips] = useState([])
  const [url, setUrl] = useState('https://localhost:3000/data/db.json')

  const fetchTrips = useCallback(async () => {
    const response = await fetch(url)
    const trips = await response.json()
    setTrips(trips)

  }, [url])

  useEffect(() => {
    fetchTrips()

  }, [fetchTrips])

  return (
    <div className="trip-list">
      <h2>Trip List</h2>
      <ul>
        {trips.map(trip => (
          <li key={trip.id}>
            <h3>{trip.title}</h3>
            <p>{trip.price}</p>
          </li>
        ))}
      </ul>
      <div className="filters">
        <button onClick={() => setUrl('https://localhost:3000/data/db.json?loc=europe')}>
          European Trips
        </button>
        <button onClick={() => setUrl('https://localhost:3000/data/db.json')}>
          All Trips
        </button>
      </div>
    </div>
  )
}