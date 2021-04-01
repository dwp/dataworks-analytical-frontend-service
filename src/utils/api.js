const apiCall = async (authContext, endpoint, body) => {
    const user = await authContext.getCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    var req;

    // if we have a body, this must be a POST
    if (body !== undefined) {
        const bodyWithToken = JSON.stringify(Object.assign({}, body, {id_token: jwtToken}));
        const headers =  {'Content-Type': 'application/json'}
        // for a post, fetch requires we supply a Request object
        req = new Request(`/${endpoint}`, {method: 'POST', body: bodyWithToken, headers: headers});
    } else {
        // fetch is happy with just a string for get
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
