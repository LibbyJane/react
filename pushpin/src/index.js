import React from 'react';
import ReactDOM from 'react-dom'; //glue between React and the DOM, needed to mount app with ReactDOM.render
import { AuthContextProvider } from './context/AuthContext';
import App from './App';

import './index.scss';

ReactDOM.render(
    <React.StrictMode>
        <AuthContextProvider>
            <App />
        </AuthContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);