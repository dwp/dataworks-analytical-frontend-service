const apiCall = async (authContext, endpoint) => {
    const user = await authContext.getCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    const res = await fetch(`/${endpoint}?id_token=${jwtToken}`);

    if (res.status === 200){
        if (endpoint === "connect")return `https://${await res.text()}?token=${jwtToken}`;    
        if (endpoint === "disconnect" || endpoint === "verify-user") return true;
    } else if (res.status === 404 && endpoint === "verify-user") return false;

    const errRes = await res.json();
    throw new Error(`${res.status} ${errRes.error}: ${errRes.message}`);
}

export default apiCall
