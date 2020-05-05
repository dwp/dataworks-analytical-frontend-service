import React, {Component} from 'react';
import { ProgressBar } from 'react-mdl';

export default class MainPage extends Component {
    state = {
        minutes: 5,
        seconds: 0
      }
      setTimer(){
            if (this.state.seconds > 0){
                this.setState({seconds:this.state.seconds-1})
                console.log("seconds>)")
            }else if (this.state.seconds === 0) {
                        if (this.state.minutes === 0) {
                            console.log("Error in Loading custers")
                            return ;
                        } else {
                        this.setState({minutes:this.state.minutes-1,seconds: 59})
                        console.log("seconds == 0 min min>0")
                        }   
            }   
        console.log(this.state.minutes+":"+this.state.seconds)
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
            <h1>Please wait for For clusters to Spin up</h1>
            <h2>Estimate Wait Time {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
            <ProgressBar indeterminate />
          </div>
        );
      }
}
