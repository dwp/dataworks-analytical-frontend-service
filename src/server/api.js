import {getConfig} from "../utils/appConfig";

import fetch from "node-fetch";

function HttpApiException(message, status) {
    this.message = message;
    this.status = status;
    this.name = 'HttpApiException';
}

export async function apiCall(token, endpoint, body={}) {
    const url = (`${getConfig("REACT_APP_OS_URL")}/${endpoint}`);

    // We only want the token in the header
    if ('id_token' in body) {
        delete(body['id_token'])
    }
    
    const requestConfig = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(body)
    }

    console.log(JSON.stringify(requestConfig));

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
