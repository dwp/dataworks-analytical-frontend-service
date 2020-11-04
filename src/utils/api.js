const apiCall = async (authContext, endpoint) => {
    const user = await authContext.getCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    const res = await fetch(`/${endpoint}?id_token=${jwtToken}`);

    if (res.status === 200){
        switch (endpoint) {
            case "connect":
                return `https://${await res.text()}?token=${jwtToken}`;
            case "verify-user":
                return true;
            default:
                return;
        }
    } else if (res.status === 204 && endpoint === "verify-user") return false;

    const errRes = await res.json();
    throw new Error(`${res.status} ${errRes.error}: ${errRes.message}`);
}

export default apiCall
