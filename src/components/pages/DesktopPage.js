import React from "react";

const DesktopPage = ({nav, desktopUrl}) => {

    return (
        <div class="iframe-container">
            <iframe id="iframe" src={desktopUrl} title='Remote Desktop' allowfullscreen/>
        </div>
    )
}

export default DesktopPage;
