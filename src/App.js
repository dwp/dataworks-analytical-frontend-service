import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {AmplifyAuthenticator, AmplifyRequireNewPassword, AmplifySignOut} from "@aws-amplify/ui-react";
import Header from "./components/presentational/Header";
import Footer from "./components/presentational/Footer";
import NavigationComponent from "./components/NavigationComponent";
import {Auth, Hub} from "aws-amplify";
import MainWrapper from "./components/presentational/MainWrapper";
import {AuthContext} from "./utils/Auth";
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
