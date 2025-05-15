import { useAuth } from "../../utilities/AuthProvider";

function App () {
    const auth = useAuth();

    const login = async () => {
        try {
            const response = await fetch(`http://backend-test-production-2c47.up.railway.app/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(
                    {
                        username: 'rayan',
                        password: 'rayan'
                    }
                )
            });
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log(err)
        }
    }

    const fetchExample = async () => {
        try {
            const response = await fetch(`http://backend-test-production-2c47.up.railway.app/api`);
            const json = await response.json();
            console.log(json);
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div>
                <h1>Homepage</h1>
                <p>Current user: {auth.user.username} ({auth.user.connectivityStatus})</p>
                <button onClick={login}>Login</button>
                <button onClick={fetchExample}>Fetch</button>
            </div>
        </>
    );
}

export default App;