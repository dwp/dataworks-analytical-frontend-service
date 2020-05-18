import React, {useEffect, useState, useRef} from "react";
import {Auth} from "aws-amplify"
import {Button} from "react-mdl";
import {Pages} from "../NavigationComponent";
import {Hub} from "aws-amplify";

const MainPage = ({nav}) => {
    const [isLoading, setIsLoading] = useState(true);
    const disconnectRef = useRef(false);

    useEffect(() => {
        async function checkMfaSetup() {
            const user = await Auth.currentAuthenticatedUser({bypassCache: true});
            if (user.preferredMFA !== 'SOFTWARE_TOKEN_MFA') {
                return nav.go(Pages.SETUP_MFA);
            }
            if (isLoading === true) setIsLoading(false);
        }

        checkMfaSetup();
    });

    const disconnect = async (url) => {
        if (disconnectRef.current) {
           return;
        }
        disconnectRef.current = true;
        console.log('Shutting down desktop');
        fetch(url)
            .then(() => nav.go(Pages.MAIN))
            .catch(async (res) => {
                const err = await res.text()
                console.log('Error disconnect from Orchestration Service', err);
            });
    };

    const authHandler = async (data) => {
        if (data.payload.event === 'signOut') {
            disconnect('/disconnect?id_token=' + data.payload.data.signInUserSession.idToken.jwtToken);
        }
    };

    Hub.listen('auth', authHandler);

    const createEnvironment = async () => {
        setIsLoading(true);
        const user = await Auth.currentAuthenticatedUser({bypassCache: true});
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
