import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";

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

    const fetchExample = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api`);
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
                <p>Current user: {auth.user.username} ({auth.user.connectivityStatus})</p>
                <input onChange={handleUsernameChange} placeholder='Enter username'></input>
                <input onChange={handlePasswordChange} placeholder='Enter password'></input>
                <input onChange={handleEmailChange} placeholder='Enter email'></input>
                <button onClick={ () => { register({username: username, password: password, email: email}) } }>Register</button>
                <button onClick={fetchExample}>Fetch</button>
            </div>
        </>
    );
}

export default Register;