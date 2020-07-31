import React from 'react'
import {Auth, Hub} from 'aws-amplify';
import {getConfig} from "./appConfig";
import {AUTH_STATE_CHANGE_EVENT, AuthState, TOAST_AUTH_ERROR_EVENT, UI_AUTH_CHANNEL} from "@aws-amplify/ui-components";

if (typeof window !== "undefined" && !process.title.endsWith("node")) {
    Auth.configure(
        {
            region: getConfig('REACT_APP_REGION'),
            userPoolId: getConfig('REACT_APP_USERPOOLID'),
            userPoolWebClientId: getConfig('REACT_APP_USERPOOL_WEBCLIENTID'),
            mandatorySignIn: true,
            authenticationFlowType: 'CUSTOM_AUTH',
            oauth: {
                domain: getConfig('REACT_APP_COGNITO_DOMAIN'),
                redirectSignIn: `${window.location.protocol}//${window.location.host}`,
                redirectSignOut: `${window.location.protocol}//${window.location.host}`,
                responseType: 'code',
            }
        }
    );
}

export const AuthEvents = {
    SIGN_IN: 'signIn',
    SIGN_OUT: 'signOut',
    CHANGE_PASSWORD: 'changePassword'
}

export class AuthHelper {

    constructor() {
        this.authListeners = new Map([
            [AuthEvents.SIGN_IN, []],
            [AuthEvents.SIGN_OUT, []],
            [AuthEvents.CHANGE_PASSWORD, []]
        ])

        Hub.listen('auth', (data) => this.handleAuthEvent(data));
    }

    addAuthListener(event, listener) {
        if (!this.authListeners.has(event)) throw new Error(`Unsupported event: ${event}`)
        this.authListeners.set(event, [...this.authListeners.get(event), listener])
    }

    removeAuthListener(event, listener) {
        this.authListeners.set(event, this.authListeners.get(event).filter(l => l !== listener))
    }

    handleAuthEvent(eventData) {
        const {event, data} = eventData.payload;
        if (!this.authListeners.has(event)) return;
        this.authListeners.get(event).forEach(listener => listener(data));
    }

    dispatchAuthStateChangeEvent(nextAuthState, data) {
        console.log("Dispatching auth state change: " + nextAuthState)
        Hub.dispatch(UI_AUTH_CHANNEL, {
            event: AUTH_STATE_CHANGE_EVENT,
            message: nextAuthState,
            data,
        });
    }

    dispatchAuthToast(message) {
        Hub.dispatch(UI_AUTH_CHANNEL, {
            event: TOAST_AUTH_ERROR_EVENT,
            message: message,
        });
    }

    async getCurrentUser() {
        return Auth.currentAuthenticatedUser({bypassCache: true});
    }

    async federatedSignIn() {
        return Auth.federatedSignIn({customProvider: getConfig('REACT_APP_FEDERATED_PROVIDER')})
    }

    async signIn(username, password) {
        return Auth.signIn(username, password);
    }

    async confirmSignIn(user, challengeResponse) {
        return Auth.sendCustomChallengeAnswer(user, challengeResponse);
    }

    async signOut() {
        return Auth.signOut();
    }

    async forgotPassword() {
        return this.dispatchAuthStateChangeEvent(AuthState.ForgotPassword);
    }

    async handleUserChallenge(user) {
        switch (user.challengeName) {
            case "MFA_SETUP":
                return this.dispatchAuthStateChangeEvent(AuthState.TOTPSetup, user);
            case "SOFTWARE_TOKEN_MFA":
                return this.dispatchAuthStateChangeEvent(AuthState.ConfirmSignIn, user);
            case "NEW_PASSWORD_REQUIRED":
                return this.dispatchAuthStateChangeEvent(AuthState.ResetPassword, user);
            case "CUSTOM_CHALLENGE":
                return this.dispatchAuthStateChangeEvent(AuthState.SignIn, user);
            case "SMS_MFA":
                throw new Error(`Unsupported Challenge: ${user.challengeName}`)
            default:
                this.dispatchAuthStateChangeEvent(AuthState.SignedIn, user);
        }
    }

    isFederated(user) {
        const userIdentities = JSON.parse(user.attributes.identities);
        return userIdentities.filter(identity => identity.providerType === "SAML").length > 0
    }

}

export const AuthContext = React.createContext({});

export const AuthProvider = ({children}) => (
    <AuthContext.Provider value={new AuthHelper()}>
        {children}
    </AuthContext.Provider>
);
