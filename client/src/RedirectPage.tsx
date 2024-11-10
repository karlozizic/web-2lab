import React from 'react';
import {Link} from "react-router-dom";

function RedirectPage() {
    return (
        <div>
            <h1>Login successful!</h1>
            <Link to="/login-demonstration">Go to back to broken authentication page</Link>
        </div>
    );
}

export default RedirectPage;