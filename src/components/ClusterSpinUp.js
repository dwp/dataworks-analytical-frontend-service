import React, {Component} from 'react';

class ClusterSpinUp extends Component {  
    clusterLinks = (url) =>   {
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        url[key] = value;
    });
    }
    render() {
        let url = { }
        this.getUrlVars(url)
        return(
            <div>
               <p>Url link</p>    
            </div>
        )
    }
}
export default ClusterSpinUp;
