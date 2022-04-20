import { useState } from 'react';
import './FormNewEvent.css'


export default function FormNewEvent({addEvent}) {
  const [title, setTitle] = new useState('')
  const [date, setDate] = new useState()
  const [location, setLocation] = new useState('NY')

  const resetForm = () => {
    setTitle('')
    setDate('')
    setLocation('NY')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const event = {
      title: title,
      date: date,
      location: location,
      id: Math.floor(new Date())
    }

    addEvent(event)
  }

  return (
    <form className="form-new-event" onSubmit={handleSubmit}>
      <ul className="form-fields">
        <li>
          <label htmlFor="fne-title">Event Title</label>
          <input
            id="fne-title"
            name="fne-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="fne-date">Event Date</label>
          <input
            id="fne-date"
            name="fne-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </li>
        <li>
          <label htmlFor="fne-location">Location</label>
          <select
            id="fne-location"
            name="fne-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="LS">Leeds</option>
            <option value="MB">Melbourne</option>
            <option value="NY">New York</option>
          </select>
        </li>
        <li>
          <label></label>
          <button>Submit</button>
          <button
            type="reset"
            onClick={resetForm}
          >Reset</button>
        </li>
      </ul>
      <p>
        {
          (title || date) && (
            <strong>New event: </strong>
          )
        }
        {title}
        {date && (
          <>{location} on {date}</>
        )}
      </p>
    </form>
  )
}
