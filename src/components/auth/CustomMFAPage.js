import React, {useContext, useState} from "react";
import {
    AmplifyButton,
    AmplifyFormSection,
    AmplifyLoadingSpinner,
    AmplifyPasswordField,
    AmplifyUsernameField,
    AmplifyCodeField
} from "@aws-amplify/ui-react";
import {Auth} from "aws-amplify";
import {AuthContext, AuthEvents} from "../../utils/Auth";
import {AuthState} from "@aws-amplify/ui-components";

const CustomMFAPage = ({user}) => {
    const [code, setCode] = useState({
        code: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const authContext = useContext(AuthContext);

    const handleCode = async (event) => {
        event.preventDefault();
        try {
            const confirmedUser = await authContext.confirmSignIn(user, code);
            await authContext.handleUserChallenge(confirmedUser);
        } catch(e){
            authContext.dispatchAuthToast(e.message);
            await authContext.signOut();
        }
    }

    return (
        <AmplifyFormSection handleSubmit={handleCode} headerText="Multi factor authentication code required" slot={"sign-in"}>
              <AmplifyCodeField label="Multi factor authentication code" value={code}
                                    handleInputChange={(e) => setCode(e.target.value)}/>
            <div style={{margin: '20px 0'}}>
                Need help? <a href="./faq">Vist our FAQ</a>
            </div>
            <div slot="amplify-form-section-footer" className="sign-in-form-footer">
                <AmplifyButton type={"submit"} disabled={isLoading}>
                    <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
                    <span style={{display: isLoading ? 'none' : 'initial'}}>Submit</span>
                </AmplifyButton><br />
                <div className="explanatoryText" style={{margin: '20px 0'}}>
                    <p>Open the multi factor authentication app on your device to view your authentication code and verify your identity.</p>
                    <p>The device will display a 6-digit code.</p>
                </div>
            </div>
        </AmplifyFormSection>
    )

}

export default CustomMFAPage;
