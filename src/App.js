import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import MainPage from './components/mainpage';
import AutenticationPage from './components/authenticationPage';
import '/Users/hamad.ali/DWPWork/dataworks-analytical-frontend-service/src/App.css'
import ClusterSpinUp from './components/ClusterSpinUp';

function App() {
  return (
    <BrowserRouter> 
      <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/waitingpage" component={AutenticationPage} />
          <Route path="/ClusterSpinUp" component={ClusterSpinUp} />
          
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
