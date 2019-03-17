// React stuff & Styling.
import React from 'react';
import './EditModal.css';
import './media.css';

// Redux Stuff.
import { connect } from 'react-redux';
import { 
        toggleEditModal,
        editModalChange,
        editModalremoveGenre,
        editModalNewGenreInput,
        editModalSubmitNewGenre,
        editModalSubmitModal } from '../../../store/actions/movies';

// Components
import { Modal, Button } from 'antd';
import EditField from './EditField';

const EditModal = (props) => {
    // properties used for edit modal.
    const { isVisible, newGenreField } = props.movies.editModal;
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
            onCancel={() => props.toggleEditModalHandler()}
            footer={[
            <Button key="back" onClick={() => props.toggleEditModalHandler()}>Cancel</Button>,
            <Button key="submit" type="primary" onClick={() => props.editModalSubmitModalHandler()}>
                Save
            </Button>
            ]}>
        <div className="EditModal_fields">
            <EditField 
                label='title' 
                value={title}
                change={(e) => props.editModalChangeHandler('title', e.target.value)}
                />
            <EditField 
                label='runtime' 
                value={runtime}
                change={(e) => props.editModalChangeHandler('runtime', e.target.value)}
                />
            <EditField 
                label='release date' 
                value={release_date}
                change={(e) => props.editModalChangeHandler('release_date', e.target.value)}
                />
            <EditField 
                label='production' 
                value={production_companies}
                change={(e) => props.editModalChangeHandler('production_companies', e.target.value)}
                />
            <div className="EditModal_fields-field EditModal_fields-genres">
                {
                    genres.length > 0 
                    ? genres.map((genre, i) => (
                        <div key={i}>
                            <input 
                                type='text' 
                                value={genre.name} 
                                onChange={(e) => props.editModalChangeHandler('genres', [genre.id, e.target.value])}
                                />
                            <button className='button' onClick={() => props.editModalremoveGenreHandler(genre.id)}>X</button>
                        </div>))
                    : <div>
                        <input 
                        type='text' 
                        value={newGenreField.name}
                        placeholder='add new Category'
                        onChange={(e) => props.editModalNewGenreInputHandler(e.target.value)}
                        />
                        <button className='new-genre' onClick={() => props.editModalSubmitNewGenreHandler()}>add</button>
                    </div>
                    
                }
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
        toggleEditModalHandler : () => dispatch(toggleEditModal()),
        editModalChangeHandler : ( field, content) => dispatch(editModalChange(field, content)),
        editModalremoveGenreHandler : (genreId) => dispatch(editModalremoveGenre(genreId)),
        editModalNewGenreInputHandler : (content) => dispatch(editModalNewGenreInput(content)),
        editModalSubmitNewGenreHandler : () => dispatch(editModalSubmitNewGenre()),
        editModalSubmitModalHandler : () => dispatch(editModalSubmitModal())
    }
  }


export default connect(mapStateToProps, mapDispatchToProps)(EditModal);