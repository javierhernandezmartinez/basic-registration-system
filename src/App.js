import './App.css';
import React from "react";
import Home from './components/Home'
import {HashRouter, Route, Switch} from 'react-router-dom';
import Login from "./components/Login";
import Perfil from "./components/Perfil";
import Administrador from "./components/Administrador";

function App() {

  return (
      <HashRouter>
        {
          <div id="App">
            <Switch>
              <Route path="/" exact to="/" component={Login} />
              <Route path="/home" component={Home} />
              <Route path="/admin" component={Administrador} />
            </Switch>
          </div>
        }
      </HashRouter>
  );
}

export default App;

