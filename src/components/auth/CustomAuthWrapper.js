import React, {useContext, useEffect, useState} from "react";
import CustomSignIn from "./CustomSignIn";
import CustomConfirmSignIn from "./CustomConfirmSignIn";
import {AuthContext, AuthEvents} from "../../utils/Auth";
import {AmplifyRequireNewPassword} from "@aws-amplify/ui-react";
import {AuthState} from "@aws-amplify/ui-components";

const PageState = Object.freeze({
    SIGN_IN: 'signIn',
    CUSTOM_CONFIRM_SIGN_IN: 'customConfirmSignIn',
    REQUIRE_NEW_PASSWORD: 'requireNewPassword'
});

/**
 * This custom wrapper component is needed to facilitate
 * the custom verify sign in step as there is no slot
 * for {@link AuthState.CustomConfirmSignIn} in {@link AmplifyAuthenticator}
 */
const CustomAuthWrapper = ({headerText}) => {
    const initialState = {state: PageState.SIGN_IN, user: null};
    const [pageState, setPageState] = useState(initialState);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        const resetState = () => setPageState(initialState)
        authContext.addAuthListener(AuthEvents.SIGN_OUT, resetState);

        return () => authContext.removeAuthListener(AuthEvents.SIGN_OUT, resetState);
    }, []);

    const confirmSignIn = (user) => setPageState({state: PageState.CUSTOM_CONFIRM_SIGN_IN, user});
    const requireNewPassword = async (user) => {
        setPageState({state: PageState.REQUIRE_NEW_PASSWORD, user});
        await authContext.dispatchAuthStateChangeEvent(AuthState.ResetPassword);
    }


    let signInComponent;
    switch (pageState.state) {
        case PageState.SIGN_IN:
            signInComponent = <CustomSignIn headerText={headerText} confirmUser={confirmSignIn}
                                            requireNewPassword={requireNewPassword}/>;
            break;
        case PageState.CUSTOM_CONFIRM_SIGN_IN:
            signInComponent = <CustomConfirmSignIn user={pageState.user}/>;
            break;
        case PageState.REQUIRE_NEW_PASSWORD:
            break;
        default:
            throw new Error("Invalid page state")
    }

    console.log(pageState);

    return (
        <>
            {signInComponent}
            <AmplifyRequireNewPassword user={pageState.user} handleAuthStateChange={() => {
                authContext.dispatchAuthToast("Successfully changed password. Please log in again.")
                authContext.signOut();
            }} slot={'require-new-password'}/>
        </>
    )

};

export default CustomAuthWrapper;