import React, {Component} from 'react';
import getConfig from "../utils/appConfig";

class MainPage extends Component {

    render() {
        return(
            <div>
               <button id="signIn">
                  <a href={getConfig("REACT_APP_UI_LOGIN_URL")} id="proposition-name">Sign In</a>
               </button>
            </div>
        )
    }
}
export default MainPage;
