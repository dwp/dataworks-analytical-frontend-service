import React from "react";
import {ProgressBar} from "react-mdl";
import {Pages} from "../NavigationComponent";

const ConnectPage = ({nav, desktopUrl}) => {
    const timeOutAt = Date.now() + 5 * 60 * 1000 // 5 minutes
    const checkInterval = setInterval(async () => {
        const status = await fetch(desktopUrl).then(res => res.status);
        if (status === 200) {
            clearInterval(checkInterval);
            return nav.go(Pages.DESKTOP, {desktopUrl})
        }

        if (Date.now() > timeOutAt) {
            clearInterval(checkInterval);
            throw new Error('Analytical Environment provisioning timeout')
        }

    }, 10 * 1000) // 10 seconds

    return (
        <div className="progressStatus">
            <h2>Waiting for Analytical Environment to be provisioned</h2>
            <ProgressBar indeterminate/>
        </div>
    )
}

export default ConnectPage;
