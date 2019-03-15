// -------- Movies Reducer ------- //
// Responsible for : 
// 1. managing the movie list ( list of movie Obj ).
// 2. modals related to movie.

// relevant constants.
import { 
    GET_MOVIES_FROM_API,
    TOGGLE_MOVIE_API,
    GET_MOVIE_EDIT_INFO,
    EDIT_MODAL_TOGGLE,
    EDIT_MODAL_CHANGE,
    REMOVE_GENRE_BY_ID,
    NEW_GENRE_INPUT_CHANGE,
    SUBMIT_NEW_GENRE,
    SUBMIT_EDIT_MODAL,
    TOGGLE_ERROR_MODAL } from '../../actions/movies/constants';

// Movies Reducer State.
const initState = {
    // list of movie objects.
    movies : [],
    // preforms api call only on first load. ( then value set to false - No api calls ).
    callMovieApi : true,
    // edit modal prop.
    //isVisible - true, modal displayed.
    //fields - the different modal fields. ( id untouched, just for later use ).
    //newGenreField - when deleting all existing genres, new input opens with new genre creation option.
    editModal : {
        isVisible : false,
        newGenreField : { id: null, name: ''},
        fields : {
            id : '',
            title : '',
            runtime : '',
            release_date : '',
            genres : [],
            production_companies : ''
        }
    },
    // error modal, notify the user about errors in App.
    errorModal : {
        isVisible : false,
        errors : []
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
            // id filled & remains untouched.
            editModalFields.fields['id'] = payload;
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
        
        // --- Handler EditModal Input.
        // receive 2 vars.
        // 1. field - the name of the field should be updated ( ex. title )
        // 2. content - actual field content. ( ex. 'Harry Potter')
        // ** there is special use case for genres which recieve a list content [ <genreID>, <genre content> ]
        case EDIT_MODAL_CHANGE:
            const { field, content } = payload;
            // check if field genres special case.
            if (field === 'genres') {
                // Clone the editModal obj.
                let editModalChange = Object.assign({}, state.editModal);
                //generating new updated genres Array.
                // loop through fields find the specific field by its ID.
                let updatedGenres = editModalChange.fields.genres.map((genre) => {
                    if (genre.id === content[0]) {
                        //change the genre content.
                        return { id: genre.id, name : content[1] }
                    }
                    //return untouched genre.
                    return genre
                })
                //update the editModal clone Obj.
                editModalChange.fields.genres = updatedGenres;
                // return updated state.
                return {
                    ...state,
                    editModal: editModalChange
                }
            }
            // Any other field.
            else {
                // Create Clone of editModal.
                let editModalChange2 = Object.assign({}, state.editModal);
                //update the relevant field.
                editModalChange2.fields[field] = content;
                return {
                    ...state,
                    editModal : editModalChange2
                }
            }

        // --- Remove Genre By Id.
        // recieve genreID as payload.
        case REMOVE_GENRE_BY_ID:
            // Clone the editModal obj.
            let editModalGenreUpdate = Object.assign({}, state.editModal);
            //generating new updated genres Array.
            // loop through fields find the specific field by its ID.
            let updatedGenresArray = editModalGenreUpdate.fields.genres.filter((genre) => genre.id !== payload )
            //update the editModal clone Obj.
            editModalGenreUpdate.fields.genres = updatedGenresArray;
            return {
                ...state,
                editModal : editModalGenreUpdate
            }

        // ---editModal New Genre input field change.
        // recieve content as payload.
        case NEW_GENRE_INPUT_CHANGE:
            // editModal clone.
            let editModalNewGenre = Object.assign({}, state.editModal);
            // updating the name field of the new genre.
            editModalNewGenre.newGenreField['name'] = payload;
            return {
                ...state,
                editModal : editModalNewGenre
            }


        // --- submiting new Genre.
        // 1. generating unique id to genre.
        // 2. adding the genre to the existing genres list.
        // 3. reset newGenreField obj.
        case SUBMIT_NEW_GENRE:
            //editModal Clone. 
            let editModalNewGenreSubmit = Object.assign({}, state.editModal);
            //new genre unique id assignment.
            editModalNewGenreSubmit.newGenreField['id'] =  parseInt(Math.random() * 10000);
            // creating new genres arr with the new genre item.
            editModalNewGenreSubmit.fields.genres = [ editModalNewGenreSubmit.newGenreField ];
            // Reset The fields. ( after 100ms delay, enable smooth update of state. )
            setTimeout(() => {
                editModalNewGenreSubmit.newGenreField['id'] = null;
                editModalNewGenreSubmit.newGenreField['name'] = ''
            }, 100);
            return {
                ...state,
                editModal : editModalNewGenreSubmit
            }

        // --- toggle error modal.
        case TOGGLE_ERROR_MODAL:
            let errorModalUpdate = Object.assign({}, state.errorModal);
            errorModalUpdate.isVisible = !errorModalUpdate.isVisible;
            //reset error list if modal is off.
            if (!errorModalUpdate.isVisible) {
                errorModalUpdate.errors = [];
            }
            return {
                ...state,
                errorModal : errorModalUpdate
            }

        // --- submit edit Modal
        // 1. validate the different fields. ( not empty )
        // 2. extra validation for movie title ( only letters, not duplicate, reformat each first letter to UpperCase )
        // 3. extra validation for date input ( correct yyyy-mm-dd format )
        // 4. find the relevant movie by its id from the movies list inside the store
        //    and update the relvenat fields.
        case SUBMIT_EDIT_MODAL:
            // Movies & editModal clones.
            let editModalSubmit = Object.assign({}, state.editModal);
            let moviesUpdate = Object.assign({}, state.movies);
            let errorModalSubmit = Object.assign({}, state.errorModal);

            // 1.validate the different fields.
            // looping through the editModal properties.
            Object.entries(editModalSubmit.fields).forEach((item) => {
                // if field is empty error added to the error list.
                if( item[1] === '' ||  item[1].length === 0 ) {
                    errorModalSubmit.errors = [...errorModalSubmit.errors, `${item[0]} field is Empty`];
                }
            })

            // 2.extra validation for title field.
            editModalSubmit.fields['title'].split(' ').forEach((word) => {
                // Omitting any invalid letter with regx.
                word = word.replace(/[^0-9a-z]/gi, '');

                // uppercase the first letter, lowercase the rest.
                word = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
                console.log(word);
            })

            console.log(editModalSubmit.fields['title']);


            return {
                ...state
            }
        // --- default case, return state.
        default:
            return state
    }
}

