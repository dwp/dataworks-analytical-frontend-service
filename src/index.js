import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Auth} from 'aws-amplify';
import {getConfig} from './utils/appConfig';
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

ReactDOM.hydrate(
    <BrowserRouter>
        <App/>
    </BrowserRouter>,
    document.getElementById('root')
);
