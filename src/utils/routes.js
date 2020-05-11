import {Route, Switch} from "react-router-dom";
import MainPage from "../components/mainpage";
import React from "react";

function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={MainPage}/>
        </Switch>
    )
}

export default Routes;
