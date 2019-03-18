import { combineReducers } from 'redux';
import movies from './movies';
import general from './general';
import favorite from './favorite';

export default combineReducers({
    movies,
    general,
    favorite
})