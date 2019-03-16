// React stuff & styling.
import React from 'react';
import './MovieItem.css';
import './media.css';

// Redux Stuff.
import { connect } from 'react-redux';
import { editModal } from '../../../store/actions/movies';

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
                <button 
                    className="button MovieItem_buttons-button  MovieItem_button-add"
                    onClick={() => console.log('add to list')}>Add to list</button>
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
        editModalHandler : (id) => dispatch(editModal(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);