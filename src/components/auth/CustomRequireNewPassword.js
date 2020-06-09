import React, {useContext, useState} from 'react';
import {AmplifyButton, AmplifyFormSection, AmplifyLoadingSpinner, AmplifyPasswordField} from "@aws-amplify/ui-react";
import {AuthContext} from "../../utils/Auth";
import {AuthState} from "@aws-amplify/ui-components";
import {Auth} from "aws-amplify";

const CustomRequireNewPassword = ({user}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState();

    const authContext = useContext(AuthContext);

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        try {
            await Auth.completeNewPassword(user, password, {});
        } catch (e) {
            authContext.dispatchAuthStateChangeEvent(AuthState.SignIn);
            if(e.code === 'UserLambdaValidationException') authContext.dispatchAuthToast("Successfully changed password. Please log in again.");
            else authContext.dispatchAuthToast(e.message);
        } finally {
            setIsLoading(false);
        }

    };

    return (
        <AmplifyFormSection
            slot={'require-new-password'}
            headerText={"New password required"}
            handleSubmit={handleSubmit}
            loading={isLoading}>
            <AmplifyPasswordField value={password}
                                  handleInputChange={(e) => setPassword(e.target.value)}/>
            <div style={{margin: '20px 0'}}>
                <AmplifyButton variant={"anchor"}
                               handleButtonClick={() => authContext.dispatchAuthStateChangeEvent(AuthState.SignIn)}>
                    Back to sign in
                </AmplifyButton>
            </div>
            <div slot="amplify-form-section-footer" className="require-new-password-form-footer">
                <AmplifyButton type={"submit"} disabled={isLoading}>
                    <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
                    <span style={{display: isLoading ? 'none' : 'initial'}}>Reset password</span>
                </AmplifyButton>
            </div>
        </AmplifyFormSection>
    )
}

export default CustomRequireNewPassword;
