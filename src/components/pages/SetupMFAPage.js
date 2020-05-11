import React, {useEffect, useState} from "react";
import QRCode from "qrcode.react";
import {AmplifyButton, AmplifyCodeField} from "@aws-amplify/ui-react";
import {Auth, Hub} from "aws-amplify";
import {Pages} from "../NavigationComponent";
import {getConfigOrDefault} from "../../utils/appConfig";

const SetupMFAPage = ({nav}) => {
    const [enteredCode, setEnteredCode] = useState('');
    const [qrCode, setQrCode] = useState();

    useEffect(() => {
        async function setupMfa() {
            const user = await Auth.currentAuthenticatedUser();
            const tOtpCode = await Auth.setupTOTP(user)

            const env = getConfigOrDefault('REACT_APP_ENV', '');
            const authCode = encodeURI(`otpauth://totp/DWP-Analytics-${env}:${user.username}?secret=${tOtpCode}&issuer=DWP`);
            setQrCode(authCode);
        }

        setupMfa();
    }, []);


    const verifyOtpCode = () => Auth.currentAuthenticatedUser()
        .then((user) => Auth.verifyTotpToken(user, enteredCode).then(() => Auth.setPreferredMFA(user, 'TOTP')))
        .catch((error) => {
            console.error('Error verifying OTP Code: ', error);
            Hub.dispatch('UI Auth', {
                event: 'ToastAuthError',
                message: error.message
            });
        })

    if (qrCode)
        return (<div style={{textAlign: 'centre'}}>
            <div className="mfasetup">
                <h3>MFA Setup Required</h3>
                <QRCode value={qrCode} includeMargin='true'/>
                <div className="verificationcode">
                    <AmplifyCodeField label="Verification Code" placeholder="Enter MFA Code" value={enteredCode}
                                      handleInputChange={(event) => setEnteredCode(event.target.value)}/>
                </div>
                <AmplifyButton
                    handleButtonClick={() => verifyOtpCode().then(() => nav.go(Pages.MAIN))}>Verify</AmplifyButton>
            </div>
        </div>)
    else
        return (
            <div>Loading...</div>
        )
}

export default SetupMFAPage
