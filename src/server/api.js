import {getConfig} from "../utils/appConfig";

import fetch from "node-fetch";

function HttpApiException(message, status) {
    this.message = message;
    this.status = status;
    this.name = 'HttpApiException';
}

export async function apiCall(token, endpoint) {
    const url = (`${getConfig("REACT_APP_OS_URL")}/${endpoint}`);

    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({})
    }

    const response = await fetch(url, requestConfig);

    if (response.status === 200) {
        return response.text();
    }

    let msg = await response.text();

    throw new HttpApiException(
        msg,
        response.status
    );
}
