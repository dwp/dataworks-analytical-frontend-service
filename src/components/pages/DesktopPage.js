import React from "react";

const DesktopPage = ({nav, desktopUrl}) => {
    return (
        <div style={{textAlign: 'centre'}}>
            <iframe src={desktopUrl} title='Remote Desktop' height="1080" width="1920"/>
        </div>
    )
}

export default DesktopPage;
