// React stuff & styling.
import React from 'react';
import './SideNav.css';
import logo from '../../assets/logo.png';

// components
import SocialMenu from './SocialMenu/SocialMenu';
import SideNavMenu from './SideNavMenu/SideNavMenu';

export default function SideNav() {
  return (
    <div className='SideNav'>
        <div className="SideNav_logo">
          <img src={logo} alt="Logo"/>>
        </div>
        <SideNavMenu />
        <SocialMenu />
    </div>
  )
}
