import React, {useContext, useState} from "react";
import {
    AmplifyButton,
    AmplifyFormSection,
    AmplifyLoadingSpinner,
    AmplifyPasswordField,
    AmplifyUsernameField
} from "@aws-amplify/ui-react";
import {AuthContext} from "../../utils/Auth";

const CustomSignIn = ({headerText, confirmUser, requireNewPassword, forgotPassword}) => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const [isLoading, setIsLoading] = useState(false);

    const authContext = useContext(AuthContext);

    const handleSignIn = async (event) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const user = await authContext.signIn(formState.username, formState.password);
            if (user.challengeName === "CUSTOM_CHALLENGE") {
                confirmUser(user);
                await authContext.handleUserChallenge(user);
            } else if (user.challengeName === "NEW_PASSWORD_REQUIRED") requireNewPassword(user);
            else await authContext.handleUserChallenge(user);

        } catch (e) {
            authContext.dispatchAuthToast(e.message);
        } finally {
            setIsLoading(false);
            setFormState({username: '', password: ''})
        }
    };

    return (
        <AmplifyFormSection handleSubmit={handleSignIn} headerText={headerText} slot={"sign-in"}>
            <AmplifyUsernameField value={formState.username}
                                  handleInputChange={(e) => setFormState({...formState, username: e.target.value})}/>
            <AmplifyPasswordField value={formState.password}
                                  handleInputChange={(e) => setFormState({...formState, password: e.target.value})}/>
            <div style={{margin: '20px 0'}}>
                Forgot your password?{'  '}
                <AmplifyButton variant="anchor" handleButtonClick={forgotPassword}>
                    Reset password
                </AmplifyButton><br />
                Need help? <a href="./faq">Vist our FAQ</a>
            </div>
            <div slot="amplify-form-section-footer" className="sign-in-form-footer">
                <AmplifyButton type={"submit"} disabled={isLoading}>
                    <AmplifyLoadingSpinner style={{display: isLoading ? 'initial' : 'none'}}/>
                    <span style={{display: isLoading ? 'none' : 'initial'}}>Sign in</span>
                </AmplifyButton>
            </div>
        </AmplifyFormSection>
    )
}

export default CustomSignIn;
