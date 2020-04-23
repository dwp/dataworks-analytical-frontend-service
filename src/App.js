import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import MainPage from './components/mainpage';
import AutenticationPage from './components/authenticationPage';
import ClusterSpinUp from './components/ClusterSpinUp';
import './App.css';

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
