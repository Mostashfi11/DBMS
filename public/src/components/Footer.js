import React from 'react';
import '../styles/footer.css';

const Footer = () => {
    return (
        <footer>
            <a href="/privacy.html">PRIVACY POLICY</a>
            <a href="/terms.html">TERMS OF SERVICE</a>
            <button className="button" id="logout">LOGOUT</button>
        </footer>
    );
};

export default Footer;
