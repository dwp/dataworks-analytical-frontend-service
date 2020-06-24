import React, {useContext, useState} from "react";
import { AmplifyCodeField, AmplifyFormSection} from "@aws-amplify/ui-react";
import {AuthContext} from "../../utils/Auth";

const CustomConfirmSignIn = ({user}) => {
    const [enteredCode, setEnteredCode] = useState('');
    const authContext = useContext(AuthContext);

    const handleConfirmCode = async (e) => {
        e.preventDefault();
        try {
            const confirmedUser = await authContext.confirmSignIn(user, enteredCode);
            await authContext.handleUserChallenge(confirmedUser);
        } catch (e) {
            authContext.dispatchAuthToast(e.message);
            await authContext.signOut();
        }

    }

    return (
        <AmplifyFormSection handleSubmit={handleConfirmCode} headerText={"Confirm SMS code"} submitButtonText={"Confirm"} slot={"sign-in"}>
           <AmplifyCodeField label="Verification Code" value={enteredCode} handleInputChange={(e) => setEnteredCode(e.target.value)}/>
           <p>You will receive an SMS message containing a 6-digit verification code to your phone. This is required for your first log in only. You will set up app-based verification in the next step.</p>
        </AmplifyFormSection>
    )
};

export default CustomConfirmSignIn;
