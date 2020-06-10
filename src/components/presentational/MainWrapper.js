import React from "react";

const MainWrapper = ({children}) => {
    return (
        <div style={
            {
                height: "100%",
                width: "100%",
                margin: 'auto',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
            {children}
        </div>
    )
}

export default MainWrapper;
