import React, {Component} from 'react';
import { ProgressBar } from 'react-mdl';

export default class StartupDelay extends Component {
    
      state = {
      minutes: 5,
      seconds: 0
    }
    componentTime(){
      this.myInterval = setInterval(() => {
        if (this.state.seconds > 0){
           this.setState({seconds:this.setState.seconds--})
        }if (this.state.seconds === 0) {
                  if (this.state.minutes === 0) {
                    clearInterval(this.myInterval)
                  }
         }if (this.state.seconds === 0) {
          if (this.state.minutes > 0) {
              this.setState({minutes:this.setState.minutes-1,seconds:this.setState.seconds = 59})
          }}
         else{
            this.setState({minutes:this.setState.minutes--})
         }             
       
        console.log(this.state.minutes+":"+this.state.seconds)
      },1000)
    }

    componentDidMount() {
     
      if (this.state.seconds === 0) {
        if (this.state.minutes === 0 ) {
         this.componentWillUnmount()
        }
      }
      else{
        this.timer = setInterval(()=> this.getClusterUrl(), 10000);
      }   
    }
    componentWillUnmount() {
      clearInterval(this.myInterval)
      console.log("Error in Loading custers")
    }
      
    getClusterUrl() {
       fetch('http://localhost:8080/connect')
       .then(function(response){
            if(response.status === 200 || response.status === 503 || response.status === 502){
                console.log(response.body);
         }else{
           return "error"
       }
    }
  )
}
  render(){
    this.componentTime();
      return (
      <div className="progressStatus">
        <h1>Please wait for For clusters to Spin up</h1>
        <h2>Estimate Wait Time {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
        <ProgressBar indeterminate />
      </div>
    );
  }
}

 // componentTime(){
  //   this.myInterval = setInterval(() => {
  //     if (this.state.seconds > 0) {
  //         this.setState({
  //             seconds: this.state.seconds - 1
  //         })
  //     }
  //     if (this.state.seconds === 0) {
  //         if (this.state.minutes === 0) {
  //             clearInterval(this.myInterval)
  //         } else {
  //             this.setState({
  //                 minutes: this.state.minutes - 1,
  //                 seconds: 59
  //             })
  //         }
  //     } 
  // }, 1000)
  // }