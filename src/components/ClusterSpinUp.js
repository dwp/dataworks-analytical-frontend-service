import React, {Component} from 'react';

var qs = require('qs');

class ClusterSpinUp extends Component {  
    
    render() {
        var params = qs.parse(window.location.search, { ignoreQueryPrefix: true });

        return(
            <div>
              <iframe src = {params.redirectUrl} title='Remote Desktop' height="1080" width="1920"/>
            </div>
        )
    }
}
export default ClusterSpinUp;
