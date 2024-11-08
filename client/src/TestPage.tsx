import {useEffect, useState} from "react";

function TestPage() {

    const [testData, setTestData] = useState<any>(null);

    useEffect(() => {
        const fetchTestPage = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/test`, {
                    method: 'GET',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error fetching test page');
                }

                const data = await response.json();
                setTestData(data.message);
                console.log('Fetched data:', data);
            } catch (error) {
                console.error('Error fetching test page:', error);
            }
        };

        fetchTestPage();
    }, []);


    return (
        <div>
            <h1>Test Page</h1>
            <p>Test data from server: {testData}</p>
        </div>
    );
}

export default TestPage;