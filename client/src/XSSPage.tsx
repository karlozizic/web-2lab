import {useEffect, useState} from "react";

function XSSPage() {
    const [userInput, setUserInput] = useState('');
    const [userInputSafe, setUserInputSafe] = useState('');
    const [userInputSafeEval, setUserInputSafeEval] = useState('');

    const handleSubmit = () => {
        try{
            console.log('Evaluating user input:', userInput);
            eval(userInput);
        }
        catch (error) {
            console.error('Error evaluating user input:', error);
        }
    }

    const handleSubmitSafe = () => {
        const sanitizedInput = userInputSafe.replace('javascript:', '');
        setUserInputSafeEval('Sanitized user input: to value'  + sanitizedInput);
    }

    return (
        <div>
            <h1>Reflected XSS demonstration page</h1>
            <p>Unsafe malicious user information handling below</p>
            <p>enter: javascript:window.location.href='/evil-page'</p>
            <input
                value={userInput}
                onChange={(event) => setUserInput(event.target.value)}
                placeholder="user input"/>
            <button onClick={handleSubmit}>Submit</button>

            <p>Safe user input handling below</p>
            <p>enter: javascript:window.location.href='/evil-page'</p>
            <input
                value={userInputSafe}
                onChange={(event) => setUserInputSafe(event.target.value)}
                placeholder="user input safe"/>
            <button onClick={handleSubmitSafe}>Submit</button>
            <p>{userInputSafeEval}</p>
        </div>
    );
}

export default XSSPage;