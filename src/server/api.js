import {getConfig} from "../utils/appConfig";
import {incHttpGauge} from "./metrics"

import fetch from "node-fetch";

function HttpApiException(message, status) {
    this.message = message;
    this.status = status;
    this.name = 'HttpApiException';
}

const method_lookup = { 
    'connect'     : 'POST',
    'disconnect'  : 'POST',
    'verify-user' : 'GET'
}

const content_lookup = {
    'connect'     : 'json',
    'disconnect'  : 'text',
    'verify-user' : 'text'
}

export async function apiCall(token, endpoint, body={}) {
    const url = (`${getConfig("REACT_APP_OS_URL")}/${endpoint}`);

    // We only want the token in the header
    if ('id_token' in body) {
        delete body.id_token;
    }
    
    var methodType = method_lookup[endpoint] || 'GET';

    if (body && Object.keys(body).length > 0) {
        var methodType = 'POST'
    }

    var requestConfig = {
        method: methodType,
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
    }
    if (methodType === 'POST') {
        requestConfig.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestConfig);

    incHttpGauge(methodType, response.status)

    if (response.status === 200) {
        if (content_lookup[endpoint] === 'json') {
            return response.json();
        } else {
            return response.text();
        }
    }

    let msg = await response.text();

    throw new HttpApiException(
        msg,
        response.status
    );
}
