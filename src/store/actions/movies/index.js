// --------- Actions Related to Movies Section ----------- //
import axios from 'axios';
import swal from 'sweetalert';
import { 
    GET_MOVIES_FROM_API,
    TOGGLE_MOVIE_API,
    EDIT_MODAL_TOGGLE,
    GET_MOVIE_EDIT_INFO,
    EDIT_MODAL_CHANGE,
    REMOVE_GENRE_BY_ID,
    NEW_GENRE_INPUT_CHANGE,
    SUBMIT_NEW_GENRE,
    SUBMIT_EDIT_MODAL,
    TOGGLE_ERROR_MODAL,
    TOGGLE_NEW_MODAL,
    NEW_MODAL_INPUT } from './constants';

// this function calls the TMDB api & recieve list of 20 random movies.
// second api call is with each movie id that recived for extra information about the movie.
export const GetMoviesFromApi = () => {
    return dispatch => {
        // Toggle the Loader while processing Api.
        // first call retrieve random list of movies.
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=02a35c5cbc417952eab0267826fb4b58')
        .then((res) => {
            //looping through movies and call the second api for Detailed movie obj.
            //passing the new movie Obj to the movies reducer.
            res.data.results.forEach((movie, i) => {
                axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=02a35c5cbc417952eab0267826fb4b58`)
                .then((res) => {
                    dispatch( {type: GET_MOVIES_FROM_API, payload: res.data})
                })
                .catch((err) => swal( "Oops" ,  "Error Reading Details About Specific movie" ,  "error" ))
            })
            // disable the abillity to use api on next ComponentDidUpdate.
            //limiting the user to single call on enter.
            dispatch( {type: TOGGLE_MOVIE_API});
         })
        .catch((err) => {
            swal( "Oops" ,  "Failed to retrive movies Data" ,  "error" );
        });
    }
}


// Toggle editModal Action.
export const toggleEditModal = () => ({ type: EDIT_MODAL_TOGGLE });


// Responsible for edit modal display, 
// passing the current movie id to get the relevant data.
export const editModal = id => {
    return dispatch => {
        // toggle the modal 
        dispatch(toggleEditModal());
        // gathering the relevant data to specific movie by id.
        dispatch({type: GET_MOVIE_EDIT_INFO, payload: id});
    }
}



// Handle EditModal input Changes.
// function recieve 2 values
// 1. the field ( ex. title )
// 2. the content ( ex. Inception )
export const editModalChange = (field, content) => {
    return { type: EDIT_MODAL_CHANGE, payload : { field, content }}
}


// Remove specific genre By ID.
export const editModalremoveGenre = genreID => {
    return { type : REMOVE_GENRE_BY_ID, payload: genreID }
}

// input change to new genre field.
export const editModalNewGenreInput = content => {
    return { type: NEW_GENRE_INPUT_CHANGE, payload : content }
}

// creating new genre.
export const editModalSubmitNewGenre = () => {
    return { type : SUBMIT_NEW_GENRE }
}

// Submit Edit Modal.
export const editModalSubmitModal = () => {
    return { type: SUBMIT_EDIT_MODAL }
}

// toggle error modal.
export const toggleErrorModal = () => {
    return { type : TOGGLE_ERROR_MODAL }
}


// toggle new movie modal.
export const toggleNewModal = () => {
    return { type: TOGGLE_NEW_MODAL }
}

// new movie field input.
export const newModalInput = (content) => {
    return { type: NEW_MODAL_INPUT, payload : content }
}
// Add new movie by Name.
export const addMovie = ( name ) => {
    return dispatch => {
        axios.get(`http://api.themoviedb.org/3/search/movie?api_key=02a35c5cbc417952eab0267826fb4b58&query=${name}`)
        .then((res) => {
            axios.get(`https://api.themoviedb.org/3/movie/${res.data.results[0].id}?api_key=02a35c5cbc417952eab0267826fb4b58`)
            .then((res) => {
                // updathe the movie List.
                dispatch({ type : GET_MOVIES_FROM_API, payload: res.data });
                // hide NewModal.
                dispatch({ type: TOGGLE_NEW_MODAL });
                //notify user about successful addition.
                swal( "YAY !!" ,  `${name} found & added to movie list` ,  "success" );
            })
            // notify user about failure result.
            .catch((err) => {
                swal( "Oops" ,  `Could not find ${err}` ,  "error" )
                console.log(err);
            }
        })
        // notify user about failure result.
        .catch((err) => {
            swal( "Oops" ,  `Could not find ${err}` ,  "error" )
            console.log(err);
        })
    }
}