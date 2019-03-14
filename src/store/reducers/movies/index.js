// -------- Movies Reducer ------- //
// Responsible for : 
// 1. managing the movie list ( list of movie Obj ).
// 2. modals related to movie.

// relevant constants.
import { 
    GET_MOVIES_FROM_API,
    TOGGLE_MOVIE_API,
    GET_MOVIE_EDIT_INFO,
    EDIT_MODAL_TOGGLE } from '../../actions/movies/constants';

// Movies Reducer State.
const initState = {
    // list of movie objects.
    movies : [],
    // preforms api call only on first load. ( then value set to false - No api calls ).
    callMovieApi : true,
    // edit modal prop.
    //isVisible - true, modal displayed.
    //fields - the different modal fields.
    editModal : {
        isVisible : false,
        fields : {
            title : '',
            runtime : '',
            release_date : '',
            genres : [],
            production_companies : ''
        }
    }
}


// Movies Reducer Function.
export default (state = initState, { type, payload }) => {
    switch(type) {
        // --- responsible for adding the movies recieved from the api
        // --- to the movies property in the state.
        case GET_MOVIES_FROM_API:
            //extracting the relevant data from the movie Obj.
            const { 
                title,
                runtime,
                release_date,
                id,
                genres,
                poster_path,
                production_companies } = payload;
            
            // Movie object.
            let movieObj = {
                'id' : id,
                'title' : title,
                'runtime' : runtime,
                'release' : release_date,
                'genres' : genres,
                'image' : `http://image.tmdb.org/t/p/w185/${poster_path}`,
                'production' : production_companies[0].name
            };
            return {
                ...state,
                movies : [...state.movies, movieObj],
            }

        // --- toggle Api Mode.
        case TOGGLE_MOVIE_API:
            return {
                ...state,
                callMovieApi : !state.callMovieApi
            }

        // --- Toggle the Edit Modal Mode.
        case EDIT_MODAL_TOGGLE:
            //create clone of the editModal props, then toggle its value. 
            let editModalUpdate = Object.assign({}, state.editModal);
            editModalUpdate.isVisible = !editModalUpdate.isVisible;
            return {
                ...state,
                editModal : editModalUpdate
            }

        // --- Get the relevant data by movie ID.
        case GET_MOVIE_EDIT_INFO: 
            // find the relevant movie.
            let relevantMovie = state.movies.filter((movie) => movie.id === payload )
            //create editModal Clone. 
            let editModalFields = Object.assign({}, state.editModal);
            // Update editModal Fields.
            editModalFields.fields['title'] = relevantMovie[0].title;
            editModalFields.fields['runtime'] = relevantMovie[0].runtime;
            editModalFields.fields['release_date'] = relevantMovie[0].release;
            editModalFields.fields['genres'] = relevantMovie[0].genres;
            editModalFields.fields['production_companies'] = relevantMovie[0].production;
            // return the updated editModal.
            return {
                ...state,
                editModal : editModalFields
            }

        // --- default case, return state.
        default:
            return state
    }
}

