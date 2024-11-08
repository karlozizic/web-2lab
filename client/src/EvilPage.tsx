import React from 'react';
import {Link} from "react-router-dom";

function EvilPage() {
    return (
        <div className="homepage">
            <h1>Evil page!  <Link to="/">Go to Home page</Link></h1>
            <img src="https://media.istockphoto.com/id/1631047551/photo/computer-hacker-with-device-screen.jpg?s=1024x1024&w=is&k=20&c=w3DuUlOjTGBcjnXLFLKSwaddikJoyyZYHCrQWGZ8L0Y=" alt="Evil" />
        </div>
);
}

export default EvilPage;