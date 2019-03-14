import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Enabling routing inside app & access to history obj.
import { BrowserRouter } from 'react-router-dom';
// redux store & provider.
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
    , document.getElementById('root'));
