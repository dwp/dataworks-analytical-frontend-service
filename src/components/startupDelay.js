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
                          this.componentWillUnmount()
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
      async getClusterUrl(){
        let that = this;
       await fetch('http://localhost:80/login', {method:'POST',mode:'cors',cache:'no-cache',headers:{"Content-Type": "application/json"}})
        .then(function(response){
            if(response.status.code === 200 || response.status.code === 503 || response.status.code === 502){
              that.setState({status:"Cluster Ready",waitTime:"",clusterUrl:response.body})
            }
        }) 
      }
      render(){
          return (
                <div className="progressStatus">
                  <h1>{this.state.status}</h1>
                  <h2>Estimate Wait Time {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
                  <h2>Cluster URL:{this.state.clusterUrl}</h2>
                  <ProgressBar indeterminate />
                </div>
          )
      }
}
