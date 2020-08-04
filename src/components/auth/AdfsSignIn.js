import React, {useContext} from 'react';
import {AmplifyButton} from "@aws-amplify/ui-react";
import {AuthContext} from "../../utils/Auth";

const AdfsSignin = ({headerText}) => {
    const authContext = useContext(AuthContext);

    return (
        <section style={{
            maxWidth: "400px", padding: "40px", borderRadius: "6px",
            boxShadow: "1px 1px 4px 0 rgba(0, 0, 0, 0.15)"
        }}>
            <div className="form-section-header">
                <h3 style={{fontWeight: 700, fontSize: "16px", margin: "0 0 20px 0"}}>
                    {headerText}
                </h3>
            </div>
            <AmplifyButton handleButtonClick={() => authContext.federatedSignIn()}>
                Sign in with DWP ADFS
            </AmplifyButton>
        </section>
    )

}

export default AdfsSignin;
