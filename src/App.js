import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {AmplifyAuthenticator, AmplifyRequireNewPassword, AmplifySignOut} from "@aws-amplify/ui-react";
import Header from "./components/presentational/Header";
import Footer from "./components/presentational/Footer";
import NavigationComponent, {Pages} from "./components/NavigationComponent";
import {Auth, Hub} from "aws-amplify";
import MainWrapper from "./components/presentational/MainWrapper";
import {AuthContext, AuthEvents} from "./utils/Auth";
import CustomSignIn from "./components/auth/CustomSignIn";
import CustomAuthWrapper from "./components/auth/CustomAuthWrapper";

function App() {
    const authContext = useContext(AuthContext)
    const [user, setUser] = useState();

    useEffect(() => {
        let updateUser = async (e) => {
            if (e && e.payload.event === 'configured') return;
            try {
                let user = await authContext.getCurrentUser();
                setUser(user)
            } catch {
                setUser(null)
            }
        }
        Hub.listen('auth', updateUser)

        updateUser()
        return () => Hub.remove('auth', updateUser) // cleanup
    }, []);


    const disconnect = async () => {
        console.log('Shutting down desktop');
        const user = await authContext.getCurrentUser();

        await fetch(`/disconnect?id_token=${user.signInUserSession.idToken.jwtToken}`)
            .catch(async (res) => {
                const err = await res.text()
                console.log('Error disconnect from Orchestration Service', err);
            });

        await authContext.signOut();
    };

    return (
        <React.StrictMode>
            <Header user={user} disconnect={disconnect}/>
            <main id="content" role="main" className="">
                <div className="article-container group">
                    <div className="content-block">
                        <div id="desktop" className="inner">
                            <MainWrapper>
                                <AmplifyAuthenticator>
                                    <CustomAuthWrapper headerText='Analytical Environment SignIn'/>
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
