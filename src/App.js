import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import Header from "./components/presentational/Header";
import Footer from "./components/presentational/Footer";
import NavigationComponent from "./components/NavigationComponent";
import {Hub} from "aws-amplify";
import MainWrapper from "./components/presentational/MainWrapper";
import {AuthContext} from "./utils/Auth";
import CustomAuthWrapper from "./components/auth/CustomAuthWrapper";
import {I18n} from 'aws-amplify';
import {destroyEnvironment} from "./utils/api";

const authScreenLabels = {
    en: {
        'Confirm TOTP Code': 'Enter the multi-factor authentication code from your authenticator app.'
    }
};
I18n.setLanguage('en');
I18n.putVocabularies(authScreenLabels);

function App() {
    const authContext = useContext(AuthContext)
    const [user, setUser] = useState();
    const [heights, setHeights] = useState({header: 0, footer: 0});

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
    }, [authContext]);


    const disconnect = async () => {
        try {
            await destroyEnvironment(authContext);
        } catch (e) {
            console.error('Error disconnect from Orchestration Service');
        } finally {
            await authContext.signOut();
        }
    };

    useEffect(() => {
        setHeights({
            header: document.querySelector('#global-header').clientHeight,
            footer: document.querySelector('footer').clientHeight,
        });
    }, []);

    return (
        <React.StrictMode>
            <Header user={user} handleSignOut={disconnect}/>
            <main id="content" role="main" className={"group"} style={{height: `calc(100% - (${heights.footer}px + ${heights.header}px))`, position: 'relative'}}>
                <div className="article-container group" style={{height: '100%'}}>
                    <MainWrapper>
                        <AmplifyAuthenticator>
                            <CustomAuthWrapper headerText='Analytical environment sign in'/>
                            {user ? <NavigationComponent/> : null}
                        </AmplifyAuthenticator>
                    </MainWrapper>
                </div>
            </main>
            <Footer style={{position: 'absolute', bottom: '0'}}/>
        </React.StrictMode>
    );
}

export default App;
