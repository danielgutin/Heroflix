// React stuff & styling.
import React, { Component } from 'react'
import './Movies.css';

// Redux & Routing.

export default class Movies extends Component {
  render() {
    console.log(this.props);
    return (
      <div className='Movies'>
        Movies
      </div>
    )
  }
}
