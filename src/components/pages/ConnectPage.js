import React, {useContext} from "react";
import {ProgressBar} from "react-mdl";
import {Pages} from "../NavigationComponent";
import {AuthContext} from "../../utils/Auth";

const ConnectPage = ({nav, url, redirect, timeout, interval}) => {
    const authContext = useContext(AuthContext);
    const checkIsEnvironmentReady = async () => {
        try {
            const status = await fetch(url).then(res => res.status);
            if (status === 200) {
                console.log("Connecting to desktop");
                return nav.go(Pages.DESKTOP, {desktopUrl:url})
            }

            if (status === 504) {
                authContext.dispatchAuthToast('Timeout reached while trying to connect to the Analytical Environment. Please try again later.');
                return nav.go(Pages.MAIN);
            }
        } catch (e) {
            authContext.dispatchAuthToast('Error occurred when trying to connect to Analytical Environment. Please try again later.');
            console.error(JSON.stringify(e));
            return nav.go(Pages.MAIN);
        }

    }

    checkIsEnvironmentReady();

    return (
        <div className="progressStatus" style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            { redirect === false &&
            <h3>Waiting for Analytical Environment to be provisioned</h3>
            }
            { redirect === true &&
            <h3>Trying to connect you to existing provisioned environment.</h3>
            }
            <ProgressBar indeterminate/>
        </div>
    )
}

export default ConnectPage;
