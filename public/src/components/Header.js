import React from 'react';
import '../styles/header.css';

const Header = () => {
    return (
        <header>
            <input type="text" id="search" placeholder="SEARCH" />
            <img src="/logo.png" alt="Logo" id="logo" />
        </header>
    );
};

export default Header;
