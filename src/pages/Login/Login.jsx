import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';

function Login () {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        login(username, password)
    }
    

    return (
        <>
            <div className='login-container'>
                <div className="brand-container">
                    <p className="branding">Weclome to RLine!</p>
                    <p className="branding-subtitle">Login to your Account</p>
                </div>
                <div className="login-card-container">
                    <div className="login-card">
                        <div className="login-card-credentials-container">
                            <label name="login-card-credentials-username-field" htmlFor="login-card-credentials-username-field" className="login-card-credentials-username-field-label">Username</label>
                            <input onChange={handleUsernameChange} id="login-card-credentials-username-field" placeholder="Enter your username" type="text"></input>
                            <label name="login-card-credentials-password-field" htmlFor="login-card-credentials-password-field" className="login-card-credentials-password-field-label">Password</label>
                            <input onChange={handlePasswordChange} id="login-card-credentials-password-field" placeholder="Enter your password" type="password"></input>
                        </div>
                        <div className="login-card-button-container">
                            <p className="create-account-redirect">Don't have an account? <Link to="/register">Create one!</Link></p>
                            <button className="login-card-button" onClick={handleSubmit}>Login</button>
                        </div>
                    </div>
                    {auth.loginError !== "" ? 
                        (
                            <div className="login-card-error-card">{auth.loginError}</div>
                        ) : (
                            <></>
                        )
                    } 
                </div>
            </div>
        </>
    );
}

export default Login;