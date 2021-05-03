import './App.css';
import React from "react";
import Home from './components/Home'
import {HashRouter, Route, Switch} from 'react-router-dom';

function App() {

  return (
      <HashRouter>
        {
          <div id="App">
            <Switch>
              <Route path="/" exact to="/" component={Home} />
            </Switch>
          </div>
        }
      </HashRouter>
  );
}

export default App;
