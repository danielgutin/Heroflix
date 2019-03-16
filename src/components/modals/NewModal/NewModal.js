// React stuff & Styling.
import React from 'react';
import './NewModal.css';
import errorPopcorn from '../../../assets/new-movie.png';

// Redux Stuff.
import { connect } from 'react-redux';
import { toggleNewModal, newModalInput, addMovie } from '../../../store/actions/movies';

// Components
import { Modal, Button } from 'antd';

// NewModal - Displaying different errors inside App.
const NewModal = (props) => {

    // properties used for NewModal
    const { isVisible, name } = props.movies.NewModal;

  return (
    <div className='NewModal'>
        <Modal
            visible={isVisible}
            style={{ top: 20 }}
            width={550}
            className='NewModal_window'
            title="Add New Movie"
            onCancel={() => props.toggleNewModalHandler()}
            footer={[
            <Button key="search" onClick={() => props.addMovieHandler(name)}>Add Movie</Button>,
            <Button key="back" onClick={() => props.toggleNewModalHandler()}>Cancel</Button>,
            ]}>
            <div className="NewModal_content">
                <img src={errorPopcorn} alt="Error Popcorn"/>
                 <p>Please enter desired movie name</p>
                 <input 
                    type="text" 
                    placeholder="Movie's name"
                    value={name}
                    onChange={(e) => props.newModalInputHandler(e.target.value)}
                    />
                 <span>**If no movie is found that matches the name entered,
                  the nearest result will be obtained</span>
                  <span>**Be as specific as you can, if number of movies containing
                  same keyword the first one will be selected</span>
            </div>
        </Modal>
    </div>
  )
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
        toggleNewModalHandler : () => dispatch(toggleNewModal()),
        newModalInputHandler : (content) => dispatch(newModalInput(content)),
        addMovieHandler : (name) => dispatch(addMovie(name))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(NewModal);