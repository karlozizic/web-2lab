import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="homepage">
            <h1>Welcome!</h1>
            <Link to="/xss">Go to Reflected XSS demonstration page</Link>
            <br />
            <Link to="/login-demonstration">Go to Broken Authentication demonstration page</Link>
        </div>
    );
}

export default HomePage;