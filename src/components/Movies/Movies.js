// React stuff & styling.
import React, { Component } from 'react'
import './Movies.css';
import './media.css';

// Redux Stuff.
import { connect } from 'react-redux';
import { GetMoviesFromApi } from '../../store/actions/movies';

// Components.
import MovieItem from './MovieItem/MovieItem';

// Movies Class.
class Movies extends Component {

  //using componendDidMount for Api call purposes.
  componentDidMount() {
    // call the TMDB movies api when component loaded.
    // this func would run only once when app loads.
    if (this.props.movies.callMovieApi) {
      this.props.GetMoviesFromApiHandler();
    }
  }

  render() {
    // List of movies.
    const { movies } = this.props.movies;
    return (
      <div className='Movies'>
          {
            movies.map((movie, i) => <MovieItem key={i} movie={movie} />)
          }
      </div>
    )
  }
}


// Map Store props into component props.
const mapStateToProps = state => {
  return {
    movies : state.movies
  }
}

// Map dispatch actions into component props.
const mapDispatchToProps = dispatch => {
  return {
    GetMoviesFromApiHandler : () => dispatch(GetMoviesFromApi())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(Movies);
