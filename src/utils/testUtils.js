import {AuthContext} from "./Auth";

export const mockFetch = (statusCode, body) => {
    const mockFetchPromise = Promise.resolve({
        status: statusCode,
        json: () => Promise.resolve(body),
        text: () => Promise.resolve(body)
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
}

export const mockAuthHelper = () => {
    const getCurrentUser = jest.fn().mockImplementation(() => ({
        signInUserSession: {idToken: {jwtToken: "token"}},
        preferredMFA: "SOFTWARE_TOKEN_MFA",
    }));
    const dispatchAuthToast = jest.fn()
    return {
        getCurrentUser,
        dispatchAuthToast,
        AuthHelper: jest.fn().mockImplementation(() => ({
            getCurrentUser,
            dispatchAuthToast
        }))
    };
}

