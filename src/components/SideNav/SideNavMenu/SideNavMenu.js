// React & Styling.
import React from 'react'
import './SideNavMenu.css';
import './media.css';

import { Link } from 'react-router-dom';

export default function SideNavMenu() {
  return (
    <React.Fragment>
        <div className="SideNav_menu">
          <ul className="SideNav_menu_items">
            <Link to='/'>
              <li className="SideNav_menu_items-item active">
                <i className="fas fa-home"></i>
                <span>Home</span>
              </li>
            </Link>
            <Link to='/my_list'>
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
