// React stuff & styling.
import React, { Component } from 'react';
import './App.css';

// Redux & Routing.
import { Route, Switch } from 'react-router-dom';

// Components.
import Movies from './components/Movies/Movies';
import SideNav from './components/SideNav/SideNav';
import Favorites from './components/Favorites/Favorites';
import Setting from './components/Setting/Setting';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="app_container">
          <div className="app_container-content">
            <SideNav />
            <Switch>
              <Route exact path='/' component={Movies}/>
              <Route exact path='/my_list' component={Favorites}/>
              <Route exact path='/setting' component={Setting}/>
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
