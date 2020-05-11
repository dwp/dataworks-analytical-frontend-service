import {Route, Switch} from "react-router-dom";
import MainPage from "../components/mainpage";
import StartUpDelay from '../components/startupDelay';
import React from "react";

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route exact path="/clustersStartup" component={StartUpDelay}/>
        </Switch>
    )
}

export default Routes;
