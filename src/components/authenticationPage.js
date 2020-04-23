import React, {Component} from 'react';

class WaitingPage extends Component {
    
async postData(url = '', data = {},token) {
    const response = await fetch(url, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
        'Authorisation':token
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer', 
      body: JSON.stringify(data) 
      });
    return response.json(); 
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
        console.log(data);
    });
        return(
            <div>
                <h1>Authenticating your token</h1>
                <p>Your access_token is:</p>
                {vars.access_token.toString()}   
                <br/>             
             <button href='/ClusterSpinUp' id="spinUp">Spin up your Clusters</button> 
            </div>
        )
    }
}
export default WaitingPage;
