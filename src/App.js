import React, {useEffect, useState} from 'react';
import './App.css';
import {AmplifyAuthenticator, AmplifySignIn, AmplifySignOut, AmplifySignUp} from "@aws-amplify/ui-react";
import Header from "./components/presentational/Header";
import Footer from "./components/presentational/Footer";
import NavigationComponent from "./components/NavigationComponent";
import {Auth, Hub} from "aws-amplify";
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

    const [user, setUser] = useState();

    useEffect(() => {
        let updateUser = async (e) => {
            if(e && e.payload.event === 'configured') return;
            try {
                let user = await Auth.currentAuthenticatedUser({bypassCache:true})
                setUser(user)
            } catch {
                setUser(null)
            }
        }
        Hub.listen('auth', updateUser)

        updateUser()
        return () => Hub.remove('auth', updateUser) // cleanup
    }, []);

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
                                    {user ? <NavigationComponent style={{margin: "30px 0px"}}/> : null}
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
