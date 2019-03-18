// React stuff & styling.
import React from 'react';
import './Favorites.css';
import './media.css';

//Redux Stuff.
import { connect } from 'react-redux';

//Components
import MovieItem from '../Movies/MovieItem/MovieItem';

const Favorites = (props) => {

  const { favorites } = props.favorite

  return (
    <div className='Favorites page'>
      {
        favorites.map((movie, i) => <MovieItem key={i} movie={movie} />)
      }
    </div>
  )
}

const mapStateToProps = state => {
  return {
    favorite : state.favorite
  }
}


export default connect(mapStateToProps)(Favorites);