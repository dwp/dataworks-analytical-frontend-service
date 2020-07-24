import React from "react";

const DesktopPage = ({desktopUrl}) => {
    const setUpFocusListener = () => {
        const rdIframe = document.querySelector("#rd-iframe");
        rdIframe.contentWindow.document.addEventListener('click', () => {
            rdIframe.contentWindow.focus();
        })
    }

    const headerHeight = document.querySelector('#global-header').clientHeight;
    document.querySelector('footer').style.display = 'none';

    return (
        <div className="iframe-container" style={{
            height: `calc(100vh - ${headerHeight}px)`,
            position: 'absolute',
            top: 0,
            left: 0,
        }}>
            <iframe onLoad={setUpFocusListener} id="rd-iframe" src={desktopUrl} title='Remote Desktop' allowFullScreen/>
        </div>
    )
}

export default DesktopPage;
