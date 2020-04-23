import React, {Component} from 'react';
require('dotenv').config()

class MainPage extends Component {  

    render() {
        return(
            <div>
               <button id="signIn">
                  <a href="{link} "id="proposition-name">Sign in</a>
               </button>
            <p>Main page</p>    
            </div>
        )
    }
}
export default MainPage;
