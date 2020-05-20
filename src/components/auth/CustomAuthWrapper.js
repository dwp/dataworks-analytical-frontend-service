import React, {useContext, useEffect, useState} from "react";
import CustomSignIn from "./CustomSignIn";
import CustomConfirmSignIn from "./CustomConfirmSignIn";
import {AuthContext, AuthEvents} from "../../utils/Auth";

const PageState = Object.freeze({
    SIGN_IN: 'signIn',
    CUSTOM_CONFIRM_SIGN_IN: 'customConfirmSignIn'
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
    }, [])

    const customConfirmUser = (user) => {
        setPageState({state: PageState.CUSTOM_CONFIRM_SIGN_IN, user})
    }

    switch (pageState.state) {
        case PageState.SIGN_IN:
            return <CustomSignIn headerText={headerText} customConfirmUser={customConfirmUser}/>
        case PageState.CUSTOM_CONFIRM_SIGN_IN:
            return <CustomConfirmSignIn user={pageState.user}/>
        default:
            throw new Error("Invalid page state")
    }
};

export default CustomAuthWrapper;