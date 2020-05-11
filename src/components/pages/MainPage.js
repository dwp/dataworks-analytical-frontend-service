import React, {useEffect, useState} from "react";
import {Auth} from "aws-amplify"
import {Button} from "react-mdl";
import {Pages} from "../NavigationComponent";

const MainPage = ({nav}) => {
    const [isMFASetup, setIsMFASetup] = useState(false);

    useEffect(() => {
        async function checkMfaSetup() {
            const user = await Auth.currentAuthenticatedUser();
            if (user.preferredMFA !== 'SOFTWARE_TOKEN_MFA') {
                return nav.go(Pages.SETUP_MFA);
            }
            setIsMFASetup(true);
        }

        checkMfaSetup();
    }, [])

    const createEnvironment = async () => {
        const user = await Auth.currentAuthenticatedUser({bypassCache: true});
        const jwtToken = user.signInUserSession.idToken.jwtToken;
        const desktopUrl = fetch(`/connect?id_token=${jwtToken}`).then(res => res.text());
        nav.go(Pages.CONNECT, {desktopUrl})
    }
    if (isMFASetup)
        return (
            <div>
                <Button onClick={createEnvironment}>Connect to Analytical Environment</Button>
            </div>)
    else
        return (<div>Loading...</div>)
};

export default MainPage;
