import { useState } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

import Dashboard from './pages/dashboard/Dashboard'
import Create from './pages/create/Create'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Note from './pages/note/Note'

import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
// import OnlineUsers from './components/OnlineUsers'

import './App.css'

function App() {
    const { authIsReady, user } = useAuthContext()
    const [pageTitle, setPageTitle] = useState('Home')

    return (
        <>
            {authIsReady && (
                <main className="App">
                    <BrowserRouter>
                        <Sidebar />
                        <div className="container">
                            <Navbar title={pageTitle} />

                            <Switch>
                                <Route exact path="/">
                                    {user && <Dashboard setPageTitle={setPageTitle} />}
                                    {!user && <Redirect to="/login" />}
                                </Route>
                                <Route path="/create">
                                    {user && <Create setPageTitle={setPageTitle} />}
                                    {!user && <Redirect to="/login" />}
                                </Route>
                                <Route path="/notes/:id">
                                    {user && <Note setPageTitle={setPageTitle} />}
                                    {!user && <Redirect to="/login" />}
                                </Route>
                                <Route path="/login">
                                    {user && <Redirect to="/" />}
                                    {!user && <Login setPageTitle={setPageTitle} />}
                                </Route>
                                <Route path="/signup">
                                    {user && <Redirect to="/" />}
                                    {!user && <Signup setPageTitle={setPageTitle} />}
                                </Route>
                            </Switch>
                        </div>

                        {/* {user &&
                            <OnlineUsers />
                        } */}
                    </BrowserRouter>
                </main>
            )}
        </>
    )
}

export default App