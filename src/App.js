import React from 'react';
import { BrowserRouter,Switch,Route } from 'react-router-dom';
import MainPage from './components/mainpage';
import WaitingPage from './components/waitingpage';
import '/Users/hamad.ali/DWPWork/dataworks-analytical-frontend-service/src/App.css'

function App() {
  return (
    <BrowserRouter> 
      <Switch>
          <Route exact path="/" component={MainPage} />
          <Route path="/waitingpage" component={WaitingPage} />
      </Switch>
    </BrowserRouter>
   
  );
}

export default App;
