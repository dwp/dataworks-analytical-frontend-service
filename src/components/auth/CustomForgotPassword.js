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

const CustomForgotPassword = () => {
    const [formState, setFormState] = useState({
        username: '',
        new_password: '',
        code: '',
    });

    const [codeSent, setCodeSent] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const authContext = useContext(AuthContext);

    const handleUserName = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            await Auth.forgotPassword(formState.username);
            setCodeSent(true);
        } catch(e){
            authContext.dispatchAuthToast(e.message);
        }finally {
            setIsLoading(false);
        }
    }

    const handlePasswordReset = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        if(formState.new_password.length < 18) authContext.dispatchAuthToast("Your password must be at least 18 characters in length. There is no additional requirement for numerical values, special characters or uppercase letters.");
        else {
            try {
                await Auth.forgotPasswordSubmit(formState.username, formState.code, formState.new_password);
                authContext.dispatchAuthStateChangeEvent(AuthState.SignIn);
                authContext.dispatchAuthToast("Successfully changed password. Please log in again.");
                authContext.handleAuthEvent({payload: {event: AuthEvents.CHANGE_PASSWORD}});
            } catch (e) {
                authContext.dispatchAuthToast(e.message);
            } finally {
                setIsLoading(false);
            }
        }
    }

    if (codeSent){
        return (
            <AmplifyFormSection handleSubmit={handlePasswordReset} headerText="Reset Forgotten Password" slot={"sign-in"}>
                 <AmplifyPasswordField value={formState.new_password}
                                        handleInputChange={(e) => setFormState({...formState, new_password: e.target.value})}/>
                  <AmplifyCodeField label="Verification Code" value={formState.code}
                                        handleInputChange={(e) => setFormState({...formState, code: e.target.value})}/>
                <div style={{margin: '20px 0'}}>
                    Need help? <a href="./faq">Vist our FAQ</a>
                </div>
                <div slot="amplify-form-section-footer" className="sign-in-form-footer">
                    <AmplifyButton type={"submit"} disabled={isLoading}>
                        <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
                        <span style={{display: isLoading ? 'none' : 'initial'}}>Reset Password</span>
                    </AmplifyButton><br />
                </div>
            </AmplifyFormSection>
        )
    } else return (
            <AmplifyFormSection handleSubmit={handleUserName} headerText="Send Confirmation Code" slot={"sign-in"}>
                <AmplifyUsernameField value={formState.username}
                                      handleInputChange={(e) => setFormState({...formState, username: e.target.value})}/>
                <div style={{margin: '20px 0'}}>
                    Need help? <a href="./faq">Vist our FAQ</a>
                </div>
                <div slot="amplify-form-section-footer" className="sign-in-form-footer">
                    <AmplifyButton type={"submit"} disabled={isLoading}>
                        <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
                        <span style={{display: isLoading ? 'none' : 'initial'}}>Submit</span>
                    </AmplifyButton><br />
                </div>
            </AmplifyFormSection>
        )
}

export default CustomForgotPassword;
