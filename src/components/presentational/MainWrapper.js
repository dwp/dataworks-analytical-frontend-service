import React from "react";

const MainWrapper = ({children}) => {
    return (
        <div style={
            {
                margin: 'auto',
                padding: '50px',
                display: 'flex',
                justifyContent: 'center',
            }}>
            {children}
        </div>
    )
}

export default MainWrapper;
