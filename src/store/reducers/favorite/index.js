// -------- Favorites Reducer ------- //
// Responsible for favorite list actions : 
// 1. remove item from list.
// 2. add item to list.

// Constants related to Favorites.
import { 
    ADD_MOVIE_TO_FAVORITES,
    REMOVE_MOVIE_FROM_FAVORITES } from '../../actions/favorite/constants';

// Cool alert Lib.
import swal from 'sweetalert';

// Initial State.
const initState = {
    // FavoriteList
    // list of movie Obj favorited by the user.
    favorites : []
}

export default ( state= initState, { type, payload } ) => {
    switch(type) {

        // --- Adding new movie Obj to Favorites List.
        case ADD_MOVIE_TO_FAVORITES:
            let isExist;
            // check if movie already in favorite list.
            state.favorites.forEach((movie) => {
                if ( movie.id === payload.id ) isExist = true;
            })
            //if movie already in your list the notify the user & return state.
            if (isExist) {
                swal('Adding Movie Failed', `${payload.title} Already in your favorite list.`, 'error');
                return state;
            // if movie not in list, add it & notify the user.
            }else {
                swal('Successfully Added', `${payload.title} Successfully Added to list.`, 'success');
                return {
                    ...state,
                    favorites : [ ...state.favorites, payload ]
                }
            }
            
        // --- Remove movie from list by id.
        case REMOVE_MOVIE_FROM_FAVORITES:
            return {
                ...state,
                favorites : state.favorites.filter((movie) => movie.id !== payload )
            }
        

        // --- Default case return state.
        default:
            return state
    }
}