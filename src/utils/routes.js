import {Route, Switch} from "react-router-dom";
import MainPage from "../components/mainpage";
import AuthenticationPage from "../components/authenticationPage";
import ClusterSpinUp from "../components/ClusterSpinUp";
import LoginFailure from "../components/LoginFailure";
import React from "react";

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
            <Route path="/waitingpage" component={AuthenticationPage}/>
            <Route path="/ClusterSpinUp" component={ClusterSpinUp}/>
            <Route path="/loginFailure" component={LoginFailure}/>
        </Switch>
    )
}

export default Routes;
