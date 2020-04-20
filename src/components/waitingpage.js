import React, {Component} from 'react';

class WaitingPage extends Component {
    
        getUrlVars = (vars) =>   {
            window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
    }
        sendData(vars){
            console.log(vars.access_token)
        }


    render() {
        let vars = {};
        this.getUrlVars(vars)
        return(
            <div>
                <p>Your access_token is:</p>
                {/* {vars.access_token.toString()} */}
             <p>Call Back page</p>   
             <button id="spinUp">
                  <a onClick={this.sendData()} id="spinUpLink" href="" >Spin up your Clusters</a>
               </button> 
            </div>
        )
    }
}
export default WaitingPage;
