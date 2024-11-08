import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="homepage">
            <h1>Welcome!</h1>
            <Link to="/test">Go to Test Page</Link>
        </div>
    );
}

export default HomePage;