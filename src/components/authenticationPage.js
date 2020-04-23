import React, {Component} from 'react';

class WaitingPage extends Component {
    
async postData(url = '', data = {},token) {

    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorisation':token
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
      });
    return response.json(); // parses JSON response into native JavaScript objects
    }
  
    getUrlVars = (vars) =>   {
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    
    }
    render() {
        let vars = {};
        this.getUrlVars(vars)
        this.postData('http://localhost:8080/connect', {}, vars.access_token)
        .then((data) => {
        console.log(data); // JSON data parsed by `response.json()` call
    });

        return(
            <div>
                <h1>Authenticating your token</h1>
                <p>Your access_token is:</p>
                {vars.access_token.toString()}                
             <button href='/ClusterSpinUp' id="spinUp">Spin up your Clusters</button> 
            </div>
        )
    }
}
export default WaitingPage;
