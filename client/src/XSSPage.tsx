import {useEffect, useState} from "react";

function XSSPage() {
    const [userInput, setUserInput] = useState('');
    const [userInputSafe, setUserInputSafe] = useState('');
    const [userInputSafeEval, setUserInputSafeEval] = useState('');
    const [isVulnerable, setIsVulnerable] = useState(false);

    const handleSubmit = () => {
        try{
            console.log('Evaluating user input: ', userInput);
            eval(userInput);
        }
        catch (error) {
            console.error('Error evaluating user input:', error);
        }
    }

    const handleSubmitSafe = () => {
        const sanitizedInput = userInputSafe.replace('javascript:', '');
        setUserInputSafeEval('Sanitized user input: '  + sanitizedInput);
    }

    return (
        <div>
            <h1>Reflected XSS demonstration page</h1>
            <p>
                Description: Not sanitizing user input is not safe, as users can inject JavaScript code that can be executed in other users' browsers.
            </p>
            <div>
                <input type="checkbox" checked={isVulnerable} onChange={(e) => setIsVulnerable(e.target.checked)}>
                </input>
                <span>Enable XSS Vulnerability</span>
            </div>
            <div>
                <h3>
                    {isVulnerable ? "Unsafe malicious user information handling below" : "Safe user information handling below"}
                </h3>
                <p>Enter: javascript:window.location.href='#/evil-page'</p>
                {isVulnerable ? (
                <div>
                    <input
                        value={userInput}
                        onChange={(event) => setUserInput(event.target.value)}
                        placeholder="user input"/>
                    <button onClick={handleSubmit}>Submit</button>
                </div>) :
                    (
                    <div>
                        <input
                            value={userInputSafe}
                            onChange={(event) => setUserInputSafe(event.target.value)}
                            placeholder="user input safe"/>
                        <button onClick={handleSubmitSafe}>Submit</button>
                        <p>{userInputSafeEval}</p>
                    </div>)
                }
            </div>
        </div>
    );
}

export default XSSPage;