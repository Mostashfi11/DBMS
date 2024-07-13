import React from 'react';
import '../styles/navigation.css';

const Navigation = () => {
    return (
        <nav>
            <button className="button" onClick={() => window.location.href='/application.html'}>REQUEST ITEMS</button>
            <button className="button" onClick={() => window.location.href='/inbox.html'}>INBOX</button>
            <button className="button" onClick={() => window.location.href='/updates.html'}>UPDATES</button>
            <a href="/category.html" className="button">CATEGORY</a>
            <a href="/report.html" className="button">REPORT</a>
        </nav>
    );
};

export default Navigation;
