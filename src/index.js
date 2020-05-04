import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { Auth } from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut, AmplifySignIn } from '@aws-amplify/ui-react';
import getConfig from './utils/appConfig';

Auth.configure(
    {
        region: getConfig('REACT_APP_REGION'),
        userPoolId: getConfig('REACT_APP_USERPOOLID'), 
        userPoolWebClientId: getConfig('REACT_APP_USERPOOL_WEBCLIENTID'),
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
