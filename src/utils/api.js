export const createEnvironment = async (authContext) => {
    const user = await authContext.getCurrentUser();
    const jwtToken = user.signInUserSession.idToken.jwtToken;
    const res = await fetch(`/connect?id_token=${jwtToken}`);
    if (res.status === 200) return `https://${await res.text()}?token=${jwtToken}`

    const errRes = await res.json();
    throw new Error(`${res.status} ${errRes.error}: ${errRes.message}`);
}


const destroyEnvironment = async (authContext) => {
    const user = await authContext.getCurrentUser();

    const res = await fetch(`/disconnect?id_token=${user.signInUserSession.idToken.jwtToken}`);
    if (res.status === 200) return;

    const errRes = await res.json();
    throw new Error(`${res.status} ${errRes.error}: ${errRes.message}`);
};
