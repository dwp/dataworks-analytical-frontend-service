import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';

Auth.configure(
    {
        region: 'eu-west-2', 
        userPoolId: 'eu-west-2_KQ9FANob7', 
        userPoolWebClientId: '2nkhasknq4qt3egjoe52iuk2vg',
        mandatorySignIn: true,

        authenticationFlowType: 'USER_PASSWORD_AUTH',
    }
);

ReactDOM.hydrate(
    <AmplifyAuthenticator>
      <AmplifySignIn headerText='Analytical Sandpit SignIn' slot='sign-in'/>
      <AmplifySignOut/>
        <BrowserRouter>
          <App/>
        </BrowserRouter>
    </AmplifyAuthenticator>,
    document.getElementById('root')
);
