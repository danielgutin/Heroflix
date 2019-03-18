// React stuff & styling.
import React from 'react';
import './SideNav.css';
import './media.css';
import logo from '../../assets/logo2.png';

// Redux Stuff.
import { connect } from 'react-redux';
import { toggleNewModal } from '../../store/actions/movies';
import { toggleResponsiveNav } from '../../store/actions/general';

// components
import { Tooltip } from 'antd';
import SocialMenu from './SocialMenu/SocialMenu';
import SideNavMenu from './SideNavMenu/SideNavMenu';

const SideNav = (props) => {
  return (
    <div className={props.general ? 'SideNav SideNav-toggled' : 'SideNav'}>
        <div className="SideNav_logo">
          <img src={logo} alt="Logo"/>
        </div>
        <SideNavMenu />
        <SocialMenu />
        <Tooltip placement="left" title={'Add new Movie'}>
          <button 
            className="button Movies-add"
            onClick={() => {
              props.toggleResponsiveNavHandler()
              props.toggleNewModalHandler()
            }}></button>
        </Tooltip>
    </div>
  )
}

// Map Store props into component props.
const mapStateToProps = state => {
  return {
    movies : state.movies,
    general : state.general.burgerNav
  }
}

// Map dispatch actions into component props.
const mapDispatchToProps = dispatch => {
  return {
      toggleNewModalHandler : () => dispatch(toggleNewModal()),
      toggleResponsiveNavHandler : () => dispatch(toggleResponsiveNav())
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
