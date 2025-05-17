import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';

function Register () {
    const auth = useAuth();

    const register = auth.register;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleUsernameChange = (e) => {
        setUsername((prev) => e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword((prev) => e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail((prev) => e.target.value)
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
                <h1>Register</h1>
                <p>Current user: {auth.user.username}</p>
                <input onChange={handleUsernameChange} placeholder='Enter username'></input>
                <input onChange={handlePasswordChange} placeholder='Enter password'></input>
                <input onChange={handleEmailChange} placeholder='Enter email'></input>
                <button onClick={ () => { register({username: username, password: password, email: email}) } }>Register</button>
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

export default Register;