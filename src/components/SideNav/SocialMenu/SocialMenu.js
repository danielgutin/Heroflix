import React from 'react';
import './SocialMenu.css';
import './media.css';

export default function SocialMenu() {
  return (
    <div className="SocialMenu_wrapper">
      <ul className="SocialMenu">
          <li>
            <a 
              className="twitter" 
              href="https://github.com/danielgutin/Heroflix" 
              target="_blank" 
              rel="noopener noreferrer">
                <i className="fab fa-github"></i>
            </a>
          </li>
          <li>
            <a 
              className="linkedin" 
              href="https://linkedin.com/in/daniel-gutin-980959176" 
              target="_blank" 
              rel="noopener noreferrer">
                <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
      </ul>
    </div>
  ) 
}
