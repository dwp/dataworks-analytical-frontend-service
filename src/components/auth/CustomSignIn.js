import React, {useContext, useState} from "react";
import {AmplifyFormSection, AmplifyPasswordField, AmplifyUsernameField} from "@aws-amplify/ui-react";
import {AuthContext, AuthEvents} from "../../utils/Auth";

const CustomSignIn = ({headerText, confirmUser, requireNewPassword}) => {
    const [formState, setFormState] = useState({
        username: '',
        password: '',
    });

    const authContext = useContext(AuthContext);

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            const user = await authContext.signIn(formState.username, formState.password);
            if (user.challengeName === "CUSTOM_CHALLENGE") confirmUser(user);
            else if(user.challengeName === "NEW_PASSWORD_REQUIRED") requireNewPassword(user);
            else await authContext.handleUserChallenge(user);

        } catch (e){
            authContext.dispatchAuthToast(e.message);
        } finally {
            setFormState({username: '', password: ''})
        }

    };

    return (
        <AmplifyFormSection handleSubmit={handleSignIn} headerText={headerText} slot={"sign-in"}>
            <AmplifyUsernameField value={formState.username} handleInputChange={(e) => setFormState({...formState, username: e.target.value})}/>
            <AmplifyPasswordField value={formState.password} handleInputChange={(e) => setFormState({...formState, password: e.target.value})}/>
        </AmplifyFormSection>
    )
}

export default CustomSignIn;
