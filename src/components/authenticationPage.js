import React, {Component, Redirect} from 'react';
import {connect} from '../api.js'

class WaitingPage extends Component {
    
    getUrlVars = (vars) =>   {
        window.location.href.replace(/[?&#]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
        });
    }

    render() {
        let vars = {};
        this.getUrlVars(vars)
        
        let redirectUrl = ''
        try {
            connect(vars.access_token)
            .then((data) => {
                redirectUrl = data;
        });
        } catch (error) {
            return ( <Redirect to='/loginFailure' />);
        }
        
        return(
            <div>
                <p>Thank you for logging in.</p>
             <button href={`/ClusterSpinUp?redirectUrl=${redirectUrl}`} id="spinUp">Spin up your Clusters</button> 
            </div>
        )
    }
}
export default WaitingPage;
