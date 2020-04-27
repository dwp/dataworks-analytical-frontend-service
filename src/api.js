function HttpApiException(message, status) {
   this.message = message;
   this.status = status;
   this.name = 'HttpApiException';
}

export async function connect(token) {

    const url = process.env.REACT_APP_API_CONNECT_ENDPOINT;

    const requestConfig = {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorisation':token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: {}
    }

    const response = await fetch(url, requestConfig);

    const data = await response.json();

    if (response.status === 200) {
      return data.body;
    }

    throw new HttpApiException(
        data || response.statusText,
        response.status
    );
}
