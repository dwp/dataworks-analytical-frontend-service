import React, {Component} from 'react';
import appConfig from "../utils/appConfig";

class MainPage extends Component {

    render() {
        console.log(appConfig);
        return(
            <div>
               <button id="signIn">
                  <a href={appConfig.REACT_APP_UI_LOGIN_URL} id="proposition-name">Sign In</a>
                    
               </button>
            </div>
        )
    }
}
export default MainPage;
