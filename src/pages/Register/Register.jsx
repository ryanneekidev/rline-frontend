import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';

function Register () {
    const auth = useAuth();

    const register = auth.register;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setConfirmedPassword] = useState("");
    const [email, setEmail] = useState("");

    const handleUsernameChange = (e) => {
        setUsername((prev) => e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword((prev) => e.target.value)
    }

    const handleConfirmedPasswordChange = (e) => {
        setConfirmedPassword((prev) => e.target.value)
    }

    const handleEmailChange = (e) => {
        setEmail((prev) => e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        register(username, password, confirmedPassword, email)
    }

    const privateFetch = async () => {
        try {
            const response = await fetch(`http://backend-test-production-2c47.up.railway.app/api/private`, {
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
            <div className='register-container'>
                <div className="brand-container">
                    <p className="branding">Weclome to RLine!</p>
                    <p className="branding-subtitle">Create your Account</p>
                </div>
                <div className="register-card-container">
                    <div className="register-card">
                        <form onSubmit={handleSubmit}>
                            <div className="register-card-credentials-container">
                                <label name="register-card-credentials-username-field" htmlFor="register-card-credentials-username-field" className="register-card-credentials-username-field-label">Username</label>
                                <input minLength="8" maxLength="16" onChange={handleUsernameChange} name="register-card-credentials-username-field" id="register-card-credentials-username-field" placeholder="Enter your username" type="text"></input>
                                <label name="register-card-credentials-username-field" htmlFor="register-card-credentials-username-field" className="register-card-credentials-username-field-label">Email</label>
                                <input onChange={handleEmailChange} name="register-card-credentials-username-field" id="register-card-credentials-username-field" placeholder="Enter your email" type="email"></input>
                                <label name="register-card-credentials-password-field" htmlFor="register-card-credentials-password-field" className="register-card-credentials-password-field-label">Password</label>
                                <input onChange={handlePasswordChange} name="register-card-credentials-password-field" id="register-card-credentials-password-field" placeholder="Enter your password" type="password"></input>
                                <label name="register-card-credentials-confirm-password-field" htmlFor="register-card-credentials-password-field" className="register-card-credentials-confirm-password-field-label">Confirm Password</label>
                                <input onChange={handleConfirmedPasswordChange} name="register-card-credentials-confirm-password-field" id="register-card-credentials-password-field" placeholder="Enter your password" type="password"></input>
                            </div>
                            <div className="register-card-button-container">
                                <p className="login-account-redirect">Already have an account? <Link to="/login">Login!</Link></p>
                                <button className="register-card-button" type="submit">Create</button>
                            </div>
                        </form>
                    </div>
                    {auth.registerError !== "" ? 
                        (
                            <div className="register-card-error-card">{auth.registerError}</div>
                        ) : (
                            <></>
                        )
                    } 
                </div>
            </div>
        </>
    );
}

export default Register;