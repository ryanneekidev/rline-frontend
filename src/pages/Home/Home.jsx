import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';

function Home () {
    const auth = useAuth();

    const login = auth.login;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = (e) => {
        setUsername((prev) => e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword((prev) => e.target.value)
    }

    const privateFetch = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/private`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${auth.token}`
                }
            });
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
                <p>Current user: {auth.user.username}</p>
                <button onClick={privateFetch}>Private Fetch</button>
                <button onClick={auth.logout}>Logout</button>
                <Link to='/'>Home</Link>
                <Link to='/register'>Register</Link>
                <Link to='/login'>Login</Link>
                <Link to='/private'>Private Route</Link>
                <p>Token: {auth.token}</p>
            </div>
        </>
    );
}

export default Home;