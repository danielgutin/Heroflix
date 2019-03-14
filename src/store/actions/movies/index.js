
// --------- Actions Related to Movies Section ----------- //
import axios from 'axios';
import swal from 'sweetalert';
import { GET_MOVIES_FROM_API } from './constants';

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
         })
        .catch((err) => {
            swal( "Oops" ,  "Failed to retrive movies Data" ,  "error" );
        });
    }
}
