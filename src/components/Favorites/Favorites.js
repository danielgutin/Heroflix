// React stuff & styling.
import React from 'react';
import './Favorites.css';
import './media.css';
import empty from '../../assets/empty.png';

//Redux Stuff.
import { connect } from 'react-redux';

//Components
import MovieItem from '../Movies/MovieItem/MovieItem';

const Favorites = (props) => {

  const { favorites } = props.favorite

  return (
    <div className='Favorites page'>
      {
        favorites.length > 0 
          ? favorites.map((movie, i) => <MovieItem key={i} movie={movie} />)
          : (
              <div className="Favorites-empty">
                <img src={empty} alt="Empty"/>
                <span>You have not added a favorite movie yet</span>
              </div>
            )
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