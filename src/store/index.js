import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import thunk from 'redux-thunk';

// Creating the store using the main reducer.
// Adding thunk middleware for async actions.
export default createStore(reducer, applyMiddleware(thunk));