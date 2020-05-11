import React from 'react';
import './App.css';
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut} from "@aws-amplify/ui-react";
import HeaderComponent from "./components/presentational/HeaderComponent";
import FooterComponent from "./components/presentational/FooterComponent";
import NavigationComponent from "./components/NavigationComponent";
import {Auth} from "aws-amplify";
import {getConfig} from "./utils/appConfig";

function App() {
    if (typeof window !== "undefined" && !process.title.endsWith("node")) {
        Auth.configure(
            {
                region: getConfig('REACT_APP_REGION'),
                userPoolId: getConfig('REACT_APP_USERPOOLID'),
                userPoolWebClientId: getConfig('REACT_APP_USERPOOL_WEBCLIENTID'),
                mandatorySignIn: true,

                authenticationFlowType: 'USER_PASSWORD_AUTH',
            }
        );
    }

    return (
        <React.StrictMode>
            <HeaderComponent/>
            <div id="global-header-bar"></div>
            <main id="content" role="main" className="">
                <div className="article-container group">
                    <div className="content-block">
                        <div id="desktop" className="inner">
                            <AmplifyAuthenticator>
                                <AmplifySignIn headerText='Analytical Sandpit SignIn' slot='sign-in'/>
                                <AmplifySignOut/>
                                <NavigationComponent/>
                            </AmplifyAuthenticator>
                        </div>
                    </div>
                </div>
            </main>
            <FooterComponent/>
        </React.StrictMode>
    );
}

export default App;
