const apiCall = async (authContext, endpoint, body) => {
    const user = await authContext.getCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    var req;

    if (body !== undefined) {
        const bodyWithToken = JSON.stringify(Object.assign({}, body, {id_token: jwtToken}));
        const headers =  {'Content-Type': 'application/json'}
        req = new Request(`/${endpoint}`, {method: 'POST', body: bodyWithToken, headers: headers});
    } else {
        req = `/${endpoint}?id_token=${jwtToken}`;
    }
    
    const res = await fetch(req);
     
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
