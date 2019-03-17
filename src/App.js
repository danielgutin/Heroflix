// React stuff & styling.
import React, { Component } from 'react';

import 'antd/dist/antd.css';  // cool UI library.
import './App.css';
import './media.css';

// Redux & Routing.
import { Route, Switch } from 'react-router-dom';

// Components.
import Movies from './components/Movies/Movies';
import SideNav from './components/SideNav/SideNav';
import Favorites from './components/Favorites/Favorites';
import BurgerNavBar from './components/SideNav/BurgerNavBar/BurgerNavBar';

// different app modals.
import EditModal from './components/modals/EditModal/EditModal';
import ErrorModal from './components/modals/ErrorModal/ErrorModal';
import NewModal from './components/modals/NewModal/NewModal';
import RemoveModal from './components/modals/RemoveModal/RemoveModal';

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
              </Switch>
            </div>
          </div>
          <EditModal />
          <ErrorModal />
          <NewModal />
          <BurgerNavBar />
          <RemoveModal />
        </div>
    );
  }
}

export default App;
