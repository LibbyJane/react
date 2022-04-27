import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { useAuthContext } from "./hooks/useAuthContext"

import Navbar from './components/Navbar';

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

export default function Routes() {
    const { authIsReady, user } = useAuthContext()

    return (
        <>
            {authIsReady && (
                <BrowserRouter>
                <Navbar />
                <Switch>
                    <Route exact path="/">
                        {user && <Home />}
                        {!user && <Redirect to="/login" />}
                    </Route>
                    <Route path="/login">
                        {user && <Redirect to="/" />}
                        {!user && <Login />}
                    </Route>
                    <Route path="/signup">
                        {user && <Redirect to="/" />}
                        {!user && <Signup />}
                    </Route>
                </Switch>
                </BrowserRouter>
            )}
        </>
    )
}
