// React stuff & styling.
import React from 'react';
import './MovieItem.css';
import './media.css';

// Redux Stuff.
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// Favorite & Movies Action Dispatchers.
import { editModal, toggleRemoveModal } from '../../../store/actions/movies';
import { addMovieToFavorites, RemoveFromFavorites } from '../../../store/actions/favorite';

const MovieItem = (props) => {
    // Movie Obj.
    const { 
        id,
        genres,
        production,
        release,
        runtime,
        title
     } = props.movie;

    const { pathname } = props.location;

  return (
    <div className='MovieItem' style={{backgroundImage: `url(${props.movie.image})`}}> 
        <div className="MovieItem_content">
            <h3>{title}</h3>
            <p><strong>Release:</strong> {release}</p>
            <p><strong>runtime:</strong> {runtime}min</p>
            <p><strong>production:</strong> {production}</p>
            <ul>
                <strong>Genres:</strong>
                <br/>
                {
                    genres.map((genre, i) => <li key={i}>{genre.name}</li>)
                }
            </ul>
            <div className="MovieItem_buttons">
                <button 
                    className="button MovieItem_buttons-button MovieItem_button-edit"
                    onClick={() => props.editModalHandler(id)}>Edit</button>
                {
                    pathname === '/' 
                    ?   (
                        <button 
                            className="button MovieItem_buttons-button  MovieItem_button-add"
                            onClick={() => props.addMovieToFavoritesHandler(props.movie)}>Add to list
                        </button>
                        )
                    : null
                }
                    <button
                        className="button MovieItem_buttons-button  MovieItem_button-remove"
                        onClick={() => {
                            // -- pathname '/' means app currently on movies page then 
                            // removal function should remove the movie from movie list reducer.
                            // -- if not '/', means app inside favorite_list path, & movie should be removed
                            // from favorite list .
                            // *** if movie removed from movie list, the movie removed from favorite as well.
                            // but not the opposite.
                            if (pathname === '/') {
                                props.toggleRemoveModalHandler(id, title);
                            } else {
                                props.RemoveFromFavoritesHandler(id);
                            }
                        }}>{pathname === '/' ? 'Remove' : 'Remove from list'} </button>
            </div>
        </div>
    </div>
  )
}

// Map Store props to Component Props.
const mapStateToProps = state => {
    return {
        movies : state.movies
    }
}

// Map actions to Component Props.
const mapDispatchToProps = dispatch => {
    return {
        editModalHandler : (id) => dispatch(editModal(id)),
        toggleRemoveModalHandler : (id, title) => dispatch(toggleRemoveModal(id, title)),
        addMovieToFavoritesHandler : (movie) => dispatch(addMovieToFavorites(movie)),
        RemoveFromFavoritesHandler : (id) => dispatch(RemoveFromFavorites(id))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MovieItem));