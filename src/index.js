import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import {AuthProvider} from "./utils/Auth";

ReactDOM.hydrate(
    <BrowserRouter>
        <AuthProvider>
            <App/>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);
