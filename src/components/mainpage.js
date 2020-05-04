import React, {Component} from 'react';
import getConfig from "../utils/appConfig";
import QRCode from 'qrcode.react';
import { Auth, Hub } from 'aws-amplify';
import { AmplifyButton, AmplifyLabel, AmplifyCodeField } from '@aws-amplify/ui-react';

const PageMode ={
        LOGIN : 'LOGIN',
        REQUIRED_MFA: 'REQUIRE_MFA',
        CONNECT: 'CONNECT',
        DISPLAY_DESKTOP: 'DISPLAY_DESKTOP'
}

class MainPage extends Component {

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
                       message: 'Attempting to connect to desktop, please wait...' };

        Hub.listen('auth', this.authEvents);

    }

    shouldDisplayQR() {
        console.log('shouldDisplayQR:', this.state);

        Auth.currentAuthenticatedUser({ bypassCache: true })
        .then((user) => {
            if (user.preferredMFA != 'SOFTWARE_TOKEN_MFA') {
               console.log("User needs to setup MFA: ", user.preferredMFA);

               Auth.setupTOTP(user)
               .then((totpcode) => {
                    let env;
                    try {
                        env = getConfig('REACT_APP_ENV');
                    } catch (e) {
                        env = '';
                    }
                    
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

    componentDidMount() {
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

        return(
              <div style={{textAlign: 'centre'}}>
                  <p>{this.state.message}</p>
              </div>
        )
    }
}

export default MainPage;
