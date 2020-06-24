import React, {useContext, useEffect, useState} from "react";
import CustomSignIn from "./CustomSignIn";
import CustomConfirmSignIn from "./CustomConfirmSignIn";
import {AuthContext, AuthEvents} from "../../utils/Auth";
import {AmplifyRequireNewPassword} from "@aws-amplify/ui-react";
import {AuthState} from "@aws-amplify/ui-components";
import CustomRequireNewPassword from "./CustomRequireNewPassword";
import CustomForgotPassword from "./CustomForgotPassword";

const PageState = Object.freeze({
    SIGN_IN: 'signIn',
    CUSTOM_CONFIRM_SIGN_IN: 'customConfirmSignIn',
    REQUIRE_NEW_PASSWORD: 'requireNewPassword',
    CUSTOM_FORGOT_PASSWORD: 'customForgotPassword'
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
        authContext.addAuthListener(AuthEvents.CHANGE_PASSWORD, resetState);

        return () => {
            authContext.removeAuthListener(AuthEvents.SIGN_OUT, resetState);
            authContext.removeAuthListener(AuthEvents.CHANGE_PASSWORD, resetState);
        }
    }, []);

    const confirmSignIn = (user) => setPageState({state: PageState.CUSTOM_CONFIRM_SIGN_IN, user});
    const requireNewPassword = async (user) => {
        setPageState({state: PageState.REQUIRE_NEW_PASSWORD, user});
        await authContext.dispatchAuthStateChangeEvent(AuthState.ResetPassword);
    }
    const forgotPassword = () =>  setPageState({state: PageState.CUSTOM_FORGOT_PASSWORD, user: null});
    const signIn = () => setPageState(initialState);

    let signInComponent;
    switch (pageState.state) {
        case PageState.SIGN_IN:
            signInComponent = <CustomSignIn headerText={headerText} confirmUser={confirmSignIn}
                                            requireNewPassword={requireNewPassword} forgotPassword={forgotPassword}/>;
            break;
        case PageState.CUSTOM_CONFIRM_SIGN_IN:
            signInComponent = <CustomConfirmSignIn user={pageState.user}/>;
            break;
        case PageState.REQUIRE_NEW_PASSWORD:
            break;
        case PageState.CUSTOM_FORGOT_PASSWORD:
            signInComponent = <CustomForgotPassword signIn={signIn}/>;
            break;
        default:
            throw new Error("Invalid page state")
    }

    return (
        <>
            {signInComponent}
            <CustomRequireNewPassword user={pageState.user}/>
        </>
    )

};

export default CustomAuthWrapper;