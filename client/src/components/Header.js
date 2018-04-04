import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a className="left brand-logo">Email Surveys</a>
          <ul className="right">
            <li>
              <a>Signin With Google</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;
