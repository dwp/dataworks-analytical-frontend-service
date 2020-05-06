import React, {Component} from 'react';
import { ProgressBar } from 'react-mdl';

export default class handleClusterDelay extends Component {
    state = {
        minutes: 0,
        seconds: 10,
        status:"Please wait for For clusters to Spin up",
        waitTime:"Estimate Wait Time"
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
        fetch('http://localhost:8080/connect')
        .then(function(response){
            if(response.status === 200 || response.status === 503 || response.status === 502){
                console.log(response.body);
            }else{
              return "error"
            }
        })
      }
        
      render(){
          return (
                <div className="progressStatus">
                  <h1>{this.state.status}</h1>
                  <h2>{this.state.waitTime} {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
                  <ProgressBar indeterminate />
                </div>
                
          )
      }
}
