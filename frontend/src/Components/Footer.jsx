// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} Todo App. Built with React & .NET Core.</p>
        </footer>
    );
};

export default Footer;