import React, { Component }from 'react';


class Login extends Component {
    constructor(props){
      super(props);
      this.state={
      username:'',
      password:''
      }
     }
    render() {
        return (
            <div className="login-box-div">
                        <h1>Sign in to your  Analytical Environment </h1>
                    <div className="user-input-div">
                        <label for= "Username">Username</label>
                        <input placeholder="Enter your Username" name="Username" onChange = {(event,newValue) => this.setState({username:newValue})} />
                    </div>
                    <div className="user-input-div">
                        <label for= "password">Password</label>
                        <input
                        type="password" placeholder="Enter your Password" name="Password" onChange = {(event,newValue) => this.setState({password:newValue})} />
                    </div>
                        <button className="button" label="Submit" primary={true} style={style} onClick={(event) => this.handleClick(event)}>Sign in</button>
            </div>
            
        );
      }
    }
    const style = {
     margin: 15,
    };
    export default Login;