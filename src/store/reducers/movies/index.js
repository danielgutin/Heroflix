// -------- Movies Reducer ------- //
// Responsible for : 
// 1. managing the movie list ( list of movie Obj ).
// 2. modals related to movie.

// relevant constants.
import { GET_MOVIES_FROM_API, TOGGLE_LOADER } from '../../actions/movies/constants';

// Movies Reducer State.
const initState = {
    // list of movie objects.
    movies : []
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

        // --- default case, return state.
        default:
            return state
    }
}

