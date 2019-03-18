// React & Styling.
import React from 'react'
import './SideNavMenu.css';
import './media.css';

// Redux Stuff
import { connect } from 'react-redux';
import { toggleResponsiveNav } from '../../../store/actions/general';

// Components
import { Link } from 'react-router-dom';

const SideNavMenu = (props) => {
  return (
    <React.Fragment>
        <div className="SideNav_menu">
          <ul className="SideNav_menu_items">
            <Link to='/' onClick={() => props.toggleResponsiveNavHandler()}>
              <li className="SideNav_menu_items-item active">
                <i className="fas fa-home"></i>
                <span>Home</span>
              </li>
            </Link>
            <Link to='/my_list' onClick={() => props.toggleResponsiveNavHandler()}>
              <li className="SideNav_menu_items-item">
                <i className="fas fa-newspaper"></i>
                <span>My List</span>
              </li>
            </Link>
          </ul>
        </div>
    </React.Fragment>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    toggleResponsiveNavHandler : () => dispatch(toggleResponsiveNav())
  }
}

export default connect(null, mapDispatchToProps)(SideNavMenu);