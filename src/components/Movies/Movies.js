// React stuff & styling.
import React, { Component } from 'react'
import './Movies.css';

// Redux Stuff.
import { connect } from 'react-redux';
import { GetMoviesFromApi } from '../../store/actions/movies';

// Components.
import MovieItem from './MovieItem/MovieItem';

// Movies Class.
class Movies extends Component {
  // init Movies.
  constructor(props) {
    super(props);
  }

  
  //using componendDidMount for Api calls purposes.
  componentDidMount() {
    // call the TMDB movies api when component loaded.
    this.props.GetMoviesFromApiHandler();
  }

  render() {
    // List of movies.
    const { movies } = this.props.movies;
    console.log(movies);
    return (
      <div className='Movies'>
          {
            movies.map((movie) => <MovieItem movie={movie} />)
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
