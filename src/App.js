import React from 'react';
import './App.css';
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp} from "@aws-amplify/ui-react";
import Header from "./components/presentational/Header";
import Footer from "./components/presentational/Footer";
import NavigationComponent from "./components/NavigationComponent";
import {Auth} from "aws-amplify";
import {getConfig} from "./utils/appConfig";
import MainWrapper from "./components/presentational/MainWrapper";

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
            <Header/>
            <main id="content" role="main" className="">
                <div className="article-container group">
                    <div className="content-block">
                        <div id="desktop" className="inner">
                            <MainWrapper>
                                <AmplifyAuthenticator>
                                    <AmplifySignOut/>
                                    <AmplifySignIn headerText='Analytical Environment SignIn' slot='sign-in'/>
                                    <NavigationComponent style={{margin: "30px 0px"}}/>
                                </AmplifyAuthenticator>
                            </MainWrapper>
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </React.StrictMode>
    );
}

export default App;
