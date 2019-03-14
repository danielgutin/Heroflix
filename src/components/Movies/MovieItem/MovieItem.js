// React stuff & styling.
import React from 'react';
import './MovieItem.css';

export default function MovieItem(props) {
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
            <ul><strong>Genres:</strong>
                {
                    genres.map((genre) => <li>{genre.name}</li>)
                }
            </ul>

        </div>
    </div>
  )
}
