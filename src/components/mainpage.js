import React, {Component} from 'react';
require('dotenv').config()

class MainPage extends Component {  

    render() {
        return(
            <div>
               <button id="signIn">
                  <a href={process.env.REACT_APP_LOGIN_URL} id="proposition-name">Sign In</a>
                    
               </button>
            <p>Main page</p>    
            </div>
        )
    }
}
export default MainPage;
