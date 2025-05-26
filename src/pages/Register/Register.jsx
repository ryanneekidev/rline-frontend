import { useState } from 'react';
import { useAuth } from "../../utilities/AuthProvider";
import Navbar from '../../components/Navbar/Navbar';
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
                <Navbar />
                <div className='register-container-main-area'>
                    {
                        auth.registerError !== "" ? (
                            <div className="error-card">{auth.registerError}</div>
                        ) : (
                            <></>
                        )
                    }
                    <p className="register-header">Create Your RLine Account</p>
                    <div className='register-card'>
                        <form className='register-form' onSubmit={handleSubmit}>
                            <div className="register-card-creds-section">
                                <label htmlFor="register-card-username-field" className='register-card-username-label'>Username</label>
                                <input type='text' id="register-card-username-field" required={true} onChange={handleUsernameChange}></input>
                                <label htmlFor="register-card-email-field" className='register-card-email-label'>Email Address</label>
                                <input type='email' id="register-card-email-field" required={true} onChange={handleEmailChange}></input>
                                <label htmlFor="register-card-password-field" className='register-card-password-label'>Password</label>
                                <input type='password' id="register-card-password-field" required={true} onChange={handlePasswordChange}></input>
                                <label htmlFor="register-card-confirm-password-label" className='register-card-confirm-password-label'>Confirm Password</label>
                                <input type='password' id="register-card-confirm-password-field" required={true} onChange={handleConfirmedPasswordChange}></input>
                            </div>
                            <button className='register-card-submit-button' type='submit'>Sign Up</button>
                        </form>
                    </div>
                    <div className="register-bottom-container">
                        <p>Already have an account?</p>
                        <Link to="/login" className="login-redirect" onClick={auth.clearAuthErrors}>Sign In Instead!</Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;