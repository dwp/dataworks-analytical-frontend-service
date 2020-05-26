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
        </AmplifyFormSection>
    )
};

export default CustomConfirmSignIn;
