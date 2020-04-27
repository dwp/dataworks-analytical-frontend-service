import React, {Component} from 'react';

class ClusterSpinUp extends Component {  
    getUrlVars = (vars) => {
        window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
      });
    }

    
    render() {
        let vars = {}
        this.getUrlVars(vars)
        return(
            <div>
              <iframe src = {vars.redirectUrl} title='Remote Desktop' height="1080" width="1920"/>
            </div>
        )
    }
}
export default ClusterSpinUp;
