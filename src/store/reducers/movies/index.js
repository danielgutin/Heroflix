// -------- Movies Reducer ------- //
// Responsible for : 
// 1. managing the movie list ( list of movie Obj ).
// 2. modals related to movie.

// Cool alert Lib.
import swal from 'sweetalert';

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
    TOGGLE_ERROR_MODAL,
    TOGGLE_NEW_MODAL,
    NEW_MODAL_INPUT } from '../../actions/movies/constants';

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
    },
    // New Movie Modal.
    // isVisible - true, modal displayed.
    // name - input field content.
    NewModal : {
        isVisible : false,
        name : ''
    }
}


// Movies Reducer Function.
export default (state = initState, { type, payload }) => {
    switch(type) {
        // --- responsible for adding the movies recieved from the api
        // to the movies property in the state.
        // recieve payload : { data: <movieObj>, first : <true / false>  }
        // data - contains the actual movie data.
        // first - notify on success addition of movie only when movie added with NewModal.
        // 1. true on first api call to load all movies.
        // 2. false when adding new movie with NewModal.
        case GET_MOVIES_FROM_API:
            //extracting the relevant data from the movie Obj.
            const { 
                title,
                runtime,
                release_date,
                id,
                genres,
                poster_path,
                production_companies } = payload.data;
            const { first } = payload;
            
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

            // Check if movie already exist.
            // looping through all movies to see if movie id already exist.
            // if so return state and notify the user that movie exist.
            if(state.movies.filter((movie) => movie.id === movieObj.id).length > 0) {
                swal( "OOPS !" ,  `${movieObj.title} Already Exist inside Movie List` ,  "error" );
                return state;
            }

            // if movie added through NewModal then notify the user on success addition.
            if ( !first ) {
                swal( "YAY !" ,  `${movieObj.title} Added to the Movie List` ,  "success" );
            }   
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
            editModalFields.fields['id'] = relevantMovie[0].id;
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
        // if after genre remove the list is empty then
        // reset the newGenreField, because new genre now can be created.
        case REMOVE_GENRE_BY_ID:
            // Clone the editModal obj.
            let editModalGenreUpdate = Object.assign({}, state.editModal);
            //generating new updated genres Array.
            // loop through fields find the specific field by its ID.
            let updatedGenresArray = editModalGenreUpdate.fields.genres.filter((genre) => genre.id !== payload )
            //update the editModal clone Obj.
            editModalGenreUpdate.fields.genres = updatedGenresArray;
            //reset newGenreField content.
            if ( editModalGenreUpdate.fields.genres.length === 0 ) {
                editModalGenreUpdate.newGenreField['id'] = null;
                editModalGenreUpdate.newGenreField['name'] = ''

            }
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
        case SUBMIT_NEW_GENRE:
            //editModal Clone. 
            let editModalNewGenreSubmit = Object.assign({}, state.editModal);
            // make sure the input field not empty.
            if ( editModalNewGenreSubmit.newGenreField['name'] ) {
                //new genre unique id assignment.
                editModalNewGenreSubmit.newGenreField['id'] =  parseInt(Math.random() * 10000);
                // creating new genres arr with the new genre item.
                editModalNewGenreSubmit.fields.genres = [ editModalNewGenreSubmit.newGenreField ];

                return {
                    ...state,
                    editModal : editModalNewGenreSubmit
                }
            // if the input field is empty return state.
            }else {
                return {
                    ...state
                }
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
            let moviesUpdate = Object.assign([], state.movies);
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
            let fixedTitle = editModalSubmit.fields['title'].split(' ').map((word) => {
                // Omitting any invalid letter with regx.
                word = word.replace(/[^a-z\-0-9:]/gi, '');
                // uppercase the first letter, lowercase the rest.
                word = word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
                // return fixed word.
                return word
            })
            //updating the title by combining all the fixed words.
            editModalSubmit.fields['title'] = fixedTitle.join(' ');

            // check that title is unique.
            let isUnique = true;
            // loop through movies & compare the new title to the rest of titles.
            Object.entries(moviesUpdate).forEach((movie) => {
                // second statment ( with id ), makes sure not comparing edit movie with itself.
                if (movie[1].title === editModalSubmit.fields['title'] &&  movie[1].id !== editModalSubmit.fields['id']) {
                    isUnique = false;
                }
            })
            // if not unique add error to list.
            if(!isUnique) {
                errorModalSubmit.errors = [...errorModalSubmit.errors, 'Title Already Exist'];
            }

            // 3. extra validation for date input ( correct yyyy-mm-dd format )
            // First check for the pattern - if valid continue operations, else add to errors.
            if (/^(\d{4}|\d{1})\-(\d{2}|\d{1})\-\d{2}$/.test(editModalSubmit.fields['release_date'])) {
                // Parse the date parts to integers
                var parts = editModalSubmit.fields['release_date'].split("-");
                var day = parseInt(parts[2], 10);
                var month = parseInt(parts[1], 10);
                var year = parseInt(parts[0], 10);

                // Check the ranges of month and year
                //year - min 1000 & max current year.
                // month - 1 up to 12.
                if(!year < 1000 || year > new Date().getFullYear() || month == 0 || month > 12) {
                    // all month lengths. 
                    var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

                    // Adjust for leap years
                    if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
                        monthLength[1] = 29;

                    //Check the range of the day for current specified month.
                    if(!(day > 0 && day <= monthLength[month - 1])) {
                        errorModalSubmit.errors = [...errorModalSubmit.errors, 'Invalid Date format ( day not exist, check your calendar ) '];
                    }               
                }else {
                    errorModalSubmit.errors = [...errorModalSubmit.errors, 'Invalid Date format ( invalid month / year )'];
                }
            }else {
                errorModalSubmit.errors = [...errorModalSubmit.errors, 'Invalid Date format ( yyyy-mm-dd )'];
            }

            // After all validating now based on errors prop check if any error occurred.
            if ( errorModalSubmit.errors.length > 0 ) {
                //display modal with errors.
                errorModalSubmit.isVisible = true;
                return {
                    ...state,
                    errorModal : errorModalSubmit    
                }
            }
            // Errors not found, so procced to stage 4.
            // 4. find the relevant movie by its id from the movies list inside the store
            //    and update the relvenat fields.
            else {
                //looping through the list of movies.
                let moviesUpdateList = moviesUpdate.map((movie) => {
                    //find the relevant movie by its id.
                    if ( movie.id === editModalSubmit.fields['id'] ) {
                        movie.production = editModalSubmit.fields['production_companies'];
                        movie.genres = editModalSubmit.fields['genres'];
                        movie.release = editModalSubmit.fields['release_date'];
                        movie.runtime = editModalSubmit.fields['runtime'];
                        movie.title = editModalSubmit.fields['title'];
                        return movie;
                    }
                    return movie;
                });
                // return updated state.
                // 1. toggle the edit modal.
                editModalSubmit.isVisible = false;
                // 2. notify the user about successful Edit.
                swal( "Successful update" ,  "Movie Item updated successfully" ,  "success" );
                // 3. return updated state.
                return {
                    ...state,
                    editModal :editModalSubmit,
                    movies : moviesUpdate,
                }
            }

        // Toggle new Movie Modal State.
        case TOGGLE_NEW_MODAL:
            let NewModalUpdate = Object.assign({}, state.NewModal);
            NewModalUpdate.isVisible = !NewModalUpdate.isVisible;
            NewModalUpdate.name = '';
            return {
                ...state,
                NewModal : NewModalUpdate
            }

        // NewModal input content.
        case NEW_MODAL_INPUT:
            let NewModalInput = Object.assign({}, state.NewModal);
            NewModalInput.name = payload;
            return {
                ...state,
                NewModal : NewModalInput
            }

        // --- default case, return state.
        default:
            return state
    }
}

