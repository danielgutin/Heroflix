// React stuff & Styling.
import React from 'react';
import './EditModal.css';

// Redux Stuff.
import { connect } from 'react-redux';
import { toggleEditModal } from '../../../store/actions/movies';

// Components
import { Modal, Button } from 'antd';

const EditModal = (props) => {
    // properties used for edit modal.
    const { isVisible } = props.movies.editModal;
    const {  
        title,
        runtime,
        release_date,
        genres,
        production_companies } = props.movies.editModal.fields;
  return (
    <div className='EditModal'>
        <Modal
            visible={isVisible}
            width={850}
            title="Edit Movie"
            onOk={() => console.log('Ok Pressed')}
            onCancel={() => props.toggleEditModalHandler()}
            footer={[
            <Button key="back" onClick={() => props.toggleEditModalHandler()}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={() => console.log('submit changes')}>
                Save
            </Button>
            ]}>
        <div className="EditModal_fields">
            <div className="EditModal_fields-field">
                <label htmlFor="">title</label>
                <input type="text" value={title}/>
            </div>
            <div className="EditModal_fields-field">
                <label htmlFor="">runtime</label>
                <input type="text" value={runtime}/>
            </div>
            <div className="EditModal_fields-field">
                <label htmlFor="">release date</label>
                <input type="text" value={release_date}/>
            </div>
            <div className="EditModal_fields-field">
                <label htmlFor="">production</label>
                <input type="text" value={production_companies}/>
            </div>
            <div className="EditModal_fields-field EditModal_fields-checkbox">
                {genres.map((genre, i) => (
                    <div key={i}>
                        <label>{genre.name}</label>
                        <input type='checkbox' checked={false} onChange={() => console.log('changed!')} />
                    </div>
                ))}
            </div>  
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
        toggleEditModalHandler : () => dispatch(toggleEditModal())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(EditModal);