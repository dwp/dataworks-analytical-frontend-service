import React, {useContext, useEffect, useState} from 'react';
import {AmplifyAuthenticator} from "@aws-amplify/ui-react";
import {AuthContext} from "../../utils/Auth";
import {Hub} from "aws-amplify";
import CustomAuthWrapper from "./CustomAuthWrapper";
import {isBrowserEnv, isMicrosoftBrowser} from "../../utils/appConfig";
import AdfsSignin from "./AdfsSignIn";

const Authenticator = ({children}) => {
    const authContext = useContext(AuthContext);
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
    }, [authContext]);


    if (isBrowserEnv() && !isMicrosoftBrowser())
        return (
            <AmplifyAuthenticator>
                <CustomAuthWrapper headerText='Analytical environment sign in'/>
                {user ? children : null}
            </AmplifyAuthenticator>)
    else
        return (
            <>
                {!user
                    ? <AdfsSignin headerText='Analytical environment sign in'/>
                    : children
                }
            </>

        )
}


export default Authenticator;
