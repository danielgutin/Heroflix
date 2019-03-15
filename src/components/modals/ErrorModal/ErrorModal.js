// React stuff & Styling.
import React from 'react';
import './ErrorModal.css';
import errorPopcorn from '../../../assets/wrong-search.png';

// Redux Stuff.
import { connect } from 'react-redux';
import { toggleErrorModal } from '../../../store/actions/movies';
// Components
import { Modal, Button } from 'antd';

// ErrorModal - Displaying different errors inside App.
const ErrorModal = (props) => {

    // properties used for errorModal
    const { isVisible, errors } = props.movies.errorModal;

  return (
    <div className='ErrorModal'>
        <Modal
            visible={isVisible}
            width={550}
            title="Error Occurred"
            onCancel={() => props.toggleErrorModalHandler()}
            footer={[
            <Button key="back" onClick={() => props.toggleErrorModalHandler()}>Cancel</Button>,
            ]}>
            <div className="ErrorModal_content">
                <img src={errorPopcorn} alt="Error Popcorn"/>
                 <h3>OOPS...</h3>
                 <p>Failed because of the following reasons</p>
                 <ul>
                    {
                        errors.map((err) => <li>{err}</li>)
                    }
                 </ul>
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
        toggleErrorModalHandler : () => dispatch(toggleErrorModal())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);