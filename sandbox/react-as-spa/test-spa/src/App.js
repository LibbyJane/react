import './App.css'
import React, {useState} from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import EventList from './components/EventList'


function App() {
  const [showModal, setShowModal] = useState(false)
  const [showEvents, setShowEvents] = useState(true)
  const [events, setEvents] = useState([
    {title: "Birthday!", id: 1},
    {title: "Easter", id: 2},
    {title: "Xmas", id: 3}
  ])

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleDeleteEvent = (id) => {
    setEvents((prevEvents) => {
      return prevEvents.filter((event)=> {
        return event.id !== id;
      })
    })
  }

  const subtitle = "Page Subtitle Text"

  return (
    <div className="App">
      <Header cssClass="site-header" title="Page Title Text" subtitle={subtitle} />

      <button onClick={()=>setShowModal(true)}>Show Modal</button>

      {
        showEvents && (
          <button type="button" onClick={()=>setShowEvents(false)}>hide events</button>
        )
      }
      {
        !showEvents && (
          <button type="button" onClick={()=>setShowEvents(true)}>show events</button>
        )
      }
      {
        showEvents && <EventList events={events} handleDeleteEvent={handleDeleteEvent} />
      }
      {
        showModal && (
          <Modal
            title="Modal Title"
            handleCloseModal={handleCloseModal}
          >
          <p>Modal paragraph one.</p>
          <p>Modal paragraph two.</p>
        </Modal>
        )
      }

    </div>
  );
}

export default App;
