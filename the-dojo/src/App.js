import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuthContext } from "./hooks/useAuthContext"

import Corkboard from './pages/corkboard/Corkboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Note from './pages/note/Note'

// import Sandbox from './pages/sandbox/Sandbox'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

import './App.css'

function App() {
    const { authIsReady, user } = useAuthContext()
    const [pageTitle, setPageTitle] = useState('all')

    return (
        <>
            {authIsReady && (
                <main className="App">
                    <BrowserRouter>
                        <Sidebar />
                        <div className="container">
                            <Navbar pageTitle={pageTitle}/>

                            <Routes>
                                <Route
                                    path="/"
                                    element={user ?  <Corkboard setPageTitle={setPageTitle} /> : <Navigate to="/login" setPageTitle={setPageTitle} />}
                                />

                                <Route
                                    path="/create"
                                    element={user ?  <Create setPageTitle={setPageTitle} /> : <Navigate to="/login" setPageTitle={setPageTitle} />}
                                />

                                <Route
                                    path="/notes/:id"
                                    element={user ?  <Note setPageTitle={setPageTitle} /> : <Navigate to="/login" setPageTitle={setPageTitle} />}
                                />

                                <Route
                                    path="/login"
                                    element={!user ?  <Login setPageTitle={setPageTitle} /> : <Navigate to="/" setPageTitle={setPageTitle}/>}
                                />

                                <Route
                                    path="/signup"
                                    element={!user ?  <Signup setPageTitle={setPageTitle} /> : <Navigate to="/" setPageTitle={setPageTitle}/>}
                                />

                                {/* Nested route test page - /sandbox and sandbox/offers -  */}
                                {/* <Route
                                    path="/sandbox/*"
                                    element={<Sandbox />}
                                /> */}

                                {/*
                                <Route
                                    path="/test"
                                    element={(
                                        <>
                                            <h1>Test Page</h1>
                                            <p>Test page content.</p>
                                        </>
                                    )}
                                /> */}
                            </Routes>
                        </div>
                    </BrowserRouter>
                </main>
            )}
        </>
    )
}

export default App