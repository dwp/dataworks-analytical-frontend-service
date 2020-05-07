import React, {Component} from 'react';
import { ProgressBar } from 'react-mdl';

export default class handleClusterDelay extends Component {
    state = {
        minutes: 5,
        seconds: 0,
        status:"Please wait for For clusters to Spin up",
        waitTime:"Estimate Wait Time",
        clusterUrl:""
      }
      setTimer(){
            if (this.state.seconds > 0){
                this.setState({seconds:this.state.seconds-1})
            }else if (this.state.seconds === 0) {
                        if (this.state.minutes === 0) {
                          this.setState({status:"Error in Loading custers",waitTime:""})
                          return;
                        } else {
                        this.setState({minutes:this.state.minutes-1,seconds: 59})
                        }   
            }
      }

      componentDidMount() {
              this.timer = setInterval(()=> this.getClusterUrl(), 10000); 
              this.timer = setInterval(()=> this.setTimer(), 1000);
        }
      
      componentWillUnmount() {
        this.timer = null; 
      }
      
      getClusterUrl(){
        fetch(REACT_APP_API_CONNECT_ENDPOINT)
        .then(function(response){
            if(response.status === 200 || response.status === 503 || response.status === 502){
              this.setState({status:"Cluster Ready",waitTime:"",clusterUrl:response.body})
                console.log(response.body);
            }else{
              this.setState({status:"Error in Loading custers",waitTime:""})
            }
        })
      }
        
      render(){
          return (
                <div className="progressStatus">
                  <h1>{this.state.status}</h1>
                  <h2>{this.state.clusterUrl}</h2>
                  <h2>{this.state.waitTime} {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
                  <ProgressBar indeterminate />
                </div>
          )
      }
}
