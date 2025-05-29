import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';

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
                <Navbar />
                <div className='login-container-main-area'>
                    {
                        auth.loginError !== "" ? (
                            <div className="error-card">{auth.loginError}</div>
                        ) : (
                            <></>
                        )
                    }
                    <p className="login-header">Sign In to RLine</p>
                    <div className='login-card'>
                        <form className='login-form' onSubmit={handleSubmit}>
                            <div className="login-card-creds-section">         
                                <label htmlFor="login-card-username-field" className='login-card-username-label'>Username</label>
                                <input type='text' id="login-card-username-field" required={true} onChange={handleUsernameChange}></input>
                                <label htmlFor="login-card-password-field" className='login-card-password-label'>Password</label>
                                <input type='password' id="login-card-password-field" required={true} onChange={handlePasswordChange}></input>
                            </div>
                            <button className='login-card-submit-button' type="submit">Sign In</button>
                        </form>
                    </div>
                    <div className="login-bottom-container">
                        <p>Don't have an account?</p>
                        <Link to="/register" className="register-redirect" onClick={auth.clearAuthErrors}>Create one!</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;