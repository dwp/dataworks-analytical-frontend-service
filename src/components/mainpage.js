import React, {Component} from 'react';

class MainPage extends Component {  

    render() {
        return(
            <div>
               <button id="signIn">
                  <a href={process.env.REACT_APP_UI_LOGIN_URL} id="proposition-name">Sign In</a>
                    
               </button>
            </div>
        )
    }
}
export default MainPage;
