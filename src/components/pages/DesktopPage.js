import React from "react";

const DesktopPage = ({nav, desktopUrl}) => {
    const setUpFocusListener = () => {
        const rdIframe = document.querySelector("#rd-iframe");
        rdIframe.contentWindow.document.addEventListener('click', () => {
            rdIframe.contentWindow.focus();
        })
    }

    return (
        <div class="iframe-container">
            <iframe onLoad={setUpFocusListener} id="rd-iframe" src={desktopUrl} title='Remote Desktop' allowfullscreen/>
        </div>
    )
}

export default DesktopPage;
