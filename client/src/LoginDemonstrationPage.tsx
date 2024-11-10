import React, {useState} from "react";
import {Link} from "react-router-dom";

function LoginDemonstrationPage() {
    const [registerUsername, setRegisterUsername] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [registerMessage, setRegisterMessage] = useState('');

    const [unsafeUsername, setUnsafeUsername] = useState('');
    const [unsafePassword, setUnsafePassword] = useState('');
    const [unsafeLoginMessage, setUnsafeLoginMessage] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);

    const [safeUsername, setSafeUsername] = useState('');
    const [safePassword, setSafePassword] = useState('');
    const [safeLoginMessage, setSafeLoginMessage] = useState('');

    const handleRegister = async (event: any) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: registerUsername, password: registerPassword})
        });

        const data = await response.json();

        if (response.ok) {
            setRegisterMessage('Successfully registered user with username: ' + data.username);
        }
        else {
            setRegisterMessage('Error registering: ' + data.error);
        }
    }

    const handleUnsafeLogin = async (event: any) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login-unsafe`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: unsafeUsername, password: unsafePassword})
        });

        const data = await response.json();
        setLoginAttempts(data.attempts);

        if (response.ok) {
            setUnsafeLoginMessage('Successfully logged in as user with username: ' + data.username);
            window.location.href = '/#/login-success';
        }
        else {
            setUnsafeLoginMessage('Error logging in: ' + data.error);
        }
    }

    const handleSafeLogin = async (event: any) => {
        event.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: safeUsername, password: safePassword})
        });

        const data = await response.json();

        if (response.ok) {
            setSafeLoginMessage('Successfully logged in as user with username: ' + data.username);
            window.location.href = '/#/login-success';
        }
        else {
            setSafeLoginMessage('Error logging in: ' + data.error);
        }
    }

    return (
        <div>
            <h1>Broken Authentication demonstration page</h1>
            <div>
                <p>Description: Unsafe login does not stop user from infinite login attempts, also gives too much information
                <br/>to unauthenticated user such as 'Username does not exist', 'Invalid password'</p>
                <p>Instructions: <br/>1. Register user <br/>2. Try unsafe and safe login by entering wrong password</p>
                <h3>Register</h3>
                <form onSubmit={handleRegister}>
                    <label>
                        Username:
                        <input type="text" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)}/>
                    </label>
                    <button type="submit">Register</button>
                </form>
                <p>{registerMessage}</p>
            </div>

            <h3>Unsafe Login</h3>
            <div>
                <form onSubmit={handleUnsafeLogin}>
                    <label>
                        Username:
                        <input type="text" value={unsafeUsername} onChange={(e) => setUnsafeUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={unsafePassword} onChange={(e) => setUnsafePassword(e.target.value)}/>
                    </label>
                    <label>
                        Login attempts: {loginAttempts}
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>{unsafeLoginMessage}</p>
            </div>
            <h3>Safe Login</h3>
            <div>
                <form onSubmit={handleSafeLogin}>
                    <label>
                        Username:
                        <input type="text" value={safeUsername} onChange={(e) => setSafeUsername(e.target.value)}/>
                    </label>
                    <label>
                        Password:
                        <input type="password" value={safePassword} onChange={(e) => setSafePassword(e.target.value)}/>
                    </label>
                    <button type="submit">Login</button>
                </form>
                <p>{safeLoginMessage}</p>
            </div>
            <br/>
            <div> <Link to="/">Go to Home page</Link></div>
        </div>
    );
}

export default LoginDemonstrationPage;