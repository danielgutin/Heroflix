// React stuff & styling.
import React from 'react';
import './SideNav.css';
import './media.css';
import logo from '../../assets/logo2.png';

// components
import { Tooltip, Button } from 'antd';
import SocialMenu from './SocialMenu/SocialMenu';
import SideNavMenu from './SideNavMenu/SideNavMenu';

export default function SideNav() {
  return (
    <div className='SideNav'>
        <div className="SideNav_logo">
          <img src={logo} alt="Logo"/>
        </div>
        <SideNavMenu />
        <SocialMenu />
        <Tooltip placement="left" title={'Add new Movie'}>
          <button className="Movies-add"></button>
        </Tooltip>
    </div>
  )
}
