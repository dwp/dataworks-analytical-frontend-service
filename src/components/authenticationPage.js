import React, {Component, Redirect} from 'react';
import {connect} from '../utils/api.js'

var qs = require('qs')

class WaitingPage extends Component {
    
    render() {
        let access_token = window.location.href.match(/.*access_token=([^&]*).*/);

        if (access_token == null) {
           access_token = window.location.href.match(/.*id_token=([^&]*).*/);
        }

        if (access_token == null) {
            return ( <Redirect to='/loginFailure' />);
        }

        let redirectUrl = '';

        try {
            connect(access_token[1])
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
