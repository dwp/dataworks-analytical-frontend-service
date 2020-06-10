import React, {useEffect, useState, useRef, useContext} from "react";
import {Button, Spinner} from "react-mdl";
import {Pages} from "../NavigationComponent";
import {AuthContext, AuthEvents} from "../../utils/Auth";

const MainPage = ({nav}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isMfaSetup, setIsMfaSetup] = useState(false);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        async function checkMfaSetup() {
            const user = await authContext.getCurrentUser();
            if (user.preferredMFA !== 'SOFTWARE_TOKEN_MFA') {
                return nav.go(Pages.SETUP_MFA);
            }
            if (isMfaSetup === false) setIsMfaSetup(true);
        }

        checkMfaSetup();
    });

    const createEnvironment = async () => {
        setIsLoading(true);
        try {
            const user = await authContext.getCurrentUser();
            const jwtToken = user.signInUserSession.idToken.jwtToken;
            const res = await fetch(`/connect?id_token=${jwtToken}`);
            if (res.status === 200) return nav.go(Pages.CONNECT, {desktopUrl: `https://${await res.text()}?token=${jwtToken}`})

            authContext.dispatchAuthToast('Error encountered while provisioning environment. Please try again later.')
            console.error(`Error connecting to OS: ${await res.json()}`);
            return nav.go(Pages.MAIN);
        } catch (e) {
            authContext.dispatchAuthToast('Error encountered while provisioning environment. Please try again later.')
            console.error(JSON.stringify(e));
        } finally {
            setIsLoading(false);
        }

    }

    if (isMfaSetup)
        return (
            <div>
                <Button raised colored onClick={createEnvironment} disabled={isLoading}
                        style={{display: "inline-flex", alignItems: "center"}}>
                    <Spinner singleColor style={{
                        display: isLoading ? 'inline-block' : 'none',
                        margin: '15px',
                    }}/>
                    Connect to Analytical Environment
                </Button>
            </div>)
    else
        return (<div>Loading...</div>)
};

export default MainPage;
