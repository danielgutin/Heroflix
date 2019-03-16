// React & Styling.
import React from 'react'
import './SideNavMenu.css';
import './media.css';

export default function SideNavMenu() {
  return (
    <React.Fragment>
        <div className="SideNav_menu">
          <ul className="SideNav_menu_items">
            <li className="SideNav_menu_items-item">
              <i className="fas fa-home"></i>
              <span>Home</span>
            </li>
            <li className="SideNav_menu_items-item">
              <i className="fas fa-newspaper"></i>
              <span>My List</span>
            </li>
          </ul>
        </div>
    </React.Fragment>
  )
}
