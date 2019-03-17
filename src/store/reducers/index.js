import { combineReducers } from 'redux';
import movies from './movies';
import general from './general';

export default combineReducers({
    movies,
    general
})