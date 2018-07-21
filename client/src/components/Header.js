// @flow
import React, { Component } from 'react';
import '../styles/Header.css';

type HeaderProps = {
  title : string
}

class Header extends Component<HeaderProps> {

  render() {
    return (
      <div className="Header">
        {this.props.title}
      </div>
    );
  }
}

export default Header;
