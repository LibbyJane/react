import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

import Dashboard from './pages/dashboard/Dashboard'
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

    return (
        <>
            {authIsReady && (
                <main className="App">
                    <BrowserRouter>
                        <Sidebar />
                        <div className="container">
                            <Navbar />

                            <Routes>
                                <Route
                                    path="/"
                                    element={user ?  <Dashboard /> : <Navigate to="/login" />}
                                />

                                <Route
                                    path="/create"
                                    element={user ?  <Create /> : <Navigate to="/login" />}
                                />

                                <Route
                                    path="/notes/:id"
                                    element={user ?  <Note /> : <Navigate to="/login" />}
                                />

                                <Route
                                    path="/login"
                                    element={!user ?  <Login /> : <Navigate to="/" />}
                                />

                                <Route
                                    path="/signup"
                                    element={!user ?  <Signup /> : <Navigate to="/" />}
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