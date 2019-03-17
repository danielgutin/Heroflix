// React stuff & Styling.
import React from 'react';
import './RemoveModal.css';
import errorPopcorn from '../../../assets/sad-popcorn.png';

// Redux Stuff.
import { connect } from 'react-redux';
import { toggleRemoveModal, removeMovieById } from '../../../store/actions/movies';
// Components
import { Modal, Button } from 'antd';

// RemoveModal - Displaying different errors inside App.
const RemoveModal = (props) => {

    // properties used for RemoveModal
    const { isVisible, id, title } = props.movies.RemoveModal;
    console.log(isVisible, id, title);
  return (
    <div className='RemoveModal'>
        <Modal
            visible={isVisible}
            style={{ top: 20 }}
            width={550}
            title="Remove Movie"
            onCancel={() => props.toggleRemoveModalHandler()}
            footer={[
            <Button key="remove" onClick={() => props.removeMovieByIdHandler(id)}>remove</Button>,
            <Button key="back" onClick={() => props.toggleRemoveModalHandler()}>Cancel</Button>,
            ]}>
            <div className="RemoveModal_content">
                <img src={errorPopcorn} alt="Error Popcorn"/>
                 <p>Are you sure you want to remove {title} ? </p>
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
        toggleRemoveModalHandler : () => dispatch(toggleRemoveModal()),
        removeMovieByIdHandler : (id) => dispatch(removeMovieById(id))
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(RemoveModal);