import React, {Component} from 'react';
import QRCode from 'qrcode.react';
import { Auth, Hub } from 'aws-amplify';
import { AmplifyButton, AmplifyLabel, AmplifyCodeField } from '@aws-amplify/ui-react';
import { ProgressBar } from 'react-mdl';
import { connect } from '../../utils/api';
import {getConfig, getConfigOrDefault} from "../../utils/appConfig";

const PageMode ={
        LOGIN : 'LOGIN',
        REQUIRED_MFA: 'REQUIRE_MFA',
        CONNECT: 'CONNECT',
        DISPLAY_DESKTOP: 'DISPLAY_DESKTOP'
}

class MainPageOld extends Component {

    constructor(props){
        super(props);

        this.verifyCode = this.verifyCode.bind(this);
        this.inputChange = this.inputChange.bind(this);
        this.authEvents = this.authEvents.bind(this);
        this.shouldDisplayQR = this.shouldDisplayQR.bind(this);
        this.shouldConnect = this.shouldConnect.bind(this);

        this.state = { code: '',
                       enteredCode: '',
                       desktopUrl: '',
                       mode: PageMode.CONNECT,
                       message: 'Attempting to connect to desktop, please wait...',
                       minutes: 5,
                       seconds: 0,
                       status:"Please wait for For clusters to Spin up",
                       waitTime:"Estimate Wait Time",
                       clusterUrl:"" };
                       
        Hub.listen('auth', this.authEvents);

    }
        setTimer(){
            if (this.state.seconds > 0){
                this.setState({seconds:this.state.seconds-1})
            }else if (this.state.seconds === 0) {
                        if (this.state.minutes === 0) {
                        this.setState({status:"Error in Loading custers",waitTime:""})
                        this.setTimertoNull()

                        } else {
                        this.setState({minutes:this.state.minutes-1,seconds: 59})
                        }   
            }
    }
    callingFunctions() {
            this.timer = setInterval(()=> this.getClusterUrl(), 10000); 
            this.timer = setInterval(()=> this.setTimer(), 1000);
        }
    setTimertoNull() {
        this.timer = null; 
    }
    
    async getClusterUrl(){
        let that = this;
    await fetch(`${getConfig("REACT_APP_OS_URL")}/connect`, {method:'POST',mode:'cors',cache:'no-cache',headers:{"Content-Type": "application/json"}, Authorisation:this.shouldConnect.jwtToken})
        .then(function(response){
            if(response.status.code === 200 || response.status.code === 503 || response.status.code === 502){
            that.setState({status:"Cluster Ready",waitTime:"",clusterUrl:response.body})
            }
        }) 
    }

    shouldDisplayQR() {
        console.log('shouldDisplayQR:', this.state);

        Auth.currentAuthenticatedUser({ bypassCache: true })
        .then((user) => {
            if (user.preferredMFA != 'SOFTWARE_TOKEN_MFA') {
               console.log("User needs to setup MFA: ", user.preferredMFA);

               Auth.setupTOTP(user)
               .then((totpcode) => {
                    const env = getConfigOrDefault('REACT_APP_ENV', '');

                    let authCode = encodeURI("otpauth://totp/DWP-Analytics-" + env + ":" + user.username + "?secret=" + totpcode + "&issuer=DWP");
                    this.state.mode = PageMode.REQUIRE_MFA;
                    this.state.code = authCode;
                    this.setState(this.state);
                    console.log("Code is ", this.state.code);
                  });
            }
        });
    }
   
    shouldConnect() {
       console.log('shouldConnect:', this.state);

       if(this.state.mode == PageMode.CONNECT) {
           Auth.currentAuthenticatedUser({ bypassCache: true})
           .then(user => {
               this.jwtToken = user.signInUserSession.idToken.jwtToken;
               if (user.preferredMFA == 'SOFTWARE_TOKEN_MFA') {
                   fetch('/connect?id_token=' + this.jwtToken)
                   .then(data => data.text())
                   .then(url => {
                       console.log("Remote URL", url);
                       this.state.desktopUrl = url;
                       this.state.mode = PageMode.DISPLAY_DESKTOP;
                       this.setState(this.state);
                   })
                   .catch(error => {
                       console.log('Error connecting to Orchestration Service:', error);
                   });
               }
           });
       }
    }

    shouldComponentUpdate(prevProps) {
        console.log('shouldComponentUpdate', this.state);

        this.shouldConnect();
        return true;
    }

    callingFunctions() {
        console.log('ComponentDidMount', this.state);

        this.shouldConnect();
    }

    authEvents(data) {

        this.shouldDisplayQR();
        if (data.payload.event == 'signIn') {
           console.log('Setting state to connect');
           this.state.mode = PageMode.CONNECT;
           this.setState(this.state);
        } else if (data.payload.event == 'signOut') {
           console.log('Shutting down desktop');
           fetch('/disconnect?id_token=' + data.payload.data.signInUserSession.idToken.jwtToken) 
           .catch(error => {
               console.log('Error disconnect from Orchestration Service', error);
           });
        }
    }

    inputChange(event) {
        this.state.enteredCode = event.target.value;
        this.setState(this.state);
    }

    verifyCode(event) {
        Auth.currentAuthenticatedUser()
        .then((user) => {
            Auth.verifyTotpToken(user, this.state.enteredCode)
            .then(() => {
                Auth.setPreferredMFA(user,'TOTP')
                .then(()=>{
                    this.setState({code:'', enteredCode:'', redirect:'', mode:PageMode.CONNECT});
                });
            })
            .catch((error) => {
                console.log('Error:', error);
                Hub.dispatch('UI Auth', {
                   event: 'ToastAuthError',
                   message: error.message
                });
            });
        }) 
    }

    render() {
        if (this.state.mode == PageMode.REQUIRE_MFA) {
            return(
              <div style={{textAlign: 'centre'}}>
                 <div class="mfasetup">
                    <h3>MFA Setup Required</h3>
                    <QRCode value={this.state.code} includeMargin='true'/>
                    <div class="verificationcode">
                        <AmplifyCodeField label="Verification Code" placeholder="Enter MFA Code" value={this.state.enteredCode} handleInputChange={this.inputChange}/>
                    </div>
                    <AmplifyButton handleButtonClick={this.verifyCode} >Verify</AmplifyButton>
                 </div>
              </div>
            )
        }

        if (this.state.mode == PageMode.DISPLAY_DESKTOP) {
            return(
                <div style={{textAlign: 'centre'}}>
                  <iframe src = {this.state.desktopUrl} title='Remote Desktop' height="1080" width="1920"/>
                </div>
            )
        }
        if (this.state.mode == PageMode.CONNECT){
            return (
                <div className="progressStatus">
                  <h1>{this.state.status}</h1>
                  <h2>Estimate Wait Time {this.state.minutes}:{this.state.seconds < 10 ? `0${this.state.seconds}` : this.state.seconds}</h2>
                  <h2>Cluster URL:{this.state.clusterUrl}</h2>
                  <ProgressBar indeterminate />
                </div>
          )
        }

        return(
              <div style={{textAlign: 'centre'}}>
                  <p>{this.state.message}</p>
              </div>
        )
    }
}

export default MainPageOld;
