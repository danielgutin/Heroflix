// --------- Actions Related to Favorites Section ----------- //

// Constants related to Favorites
import { ADD_MOVIE_TO_FAVORITES, REMOVE_MOVIE_FROM_FAVORITES } from './constants';


// Add Movie Obj to favorites List.
export const addMovieToFavorites = movie => {
    return { type: ADD_MOVIE_TO_FAVORITES, payload : movie }    
}

// Remove Movie from List By ID.
export const RemoveFromFavorites = ( id ) => {
    return { type: REMOVE_MOVIE_FROM_FAVORITES, payload : id }    
}