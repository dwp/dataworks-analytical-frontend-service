import React, {useEffect, useState, useRef, useContext} from "react";
import {Auth} from "aws-amplify"
import {Button} from "react-mdl";
import {Pages} from "../NavigationComponent";
import {Hub} from "aws-amplify";
import {AuthContext, AuthEvents} from "../../utils/Auth";

const MainPage = ({nav}) => {
    const [isLoading, setIsLoading] = useState(true);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        async function checkMfaSetup() {
            const user = await authContext.getCurrentUser();
            if (user.preferredMFA !== 'SOFTWARE_TOKEN_MFA') {
                return nav.go(Pages.SETUP_MFA);
            }
            if (isLoading === true) setIsLoading(false);
        }

        checkMfaSetup();
    });

    const createEnvironment = async () => {
        setIsLoading(true);
        const user = await authContext.getCurrentUser();
        const jwtToken = user.signInUserSession.idToken.jwtToken;
        const res = await fetch(`/connect?id_token=${jwtToken}`);
        const data = await res.text()
        if (res.status === 200) return nav.go(Pages.CONNECT, {desktopUrl: `https://${data}?token=${jwtToken}`})

        console.error('Error connecting to OS');
        return nav.go(Pages.MAIN);
    }
    if (!isLoading)
        return (
            <div>
                <Button raised colored onClick={createEnvironment}>Connect to Analytical Environment</Button>
            </div>)
    else
        return (<div>Loading...</div>)
};

export default MainPage;
