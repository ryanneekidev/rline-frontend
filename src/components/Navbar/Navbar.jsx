import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';

function Navbar() {
    const auth = useAuth();

    return (
        <>
            <div className="navbar">
                <div className="navbar-left-section">
                    <Link to="/" className="rline-logo-link">RLine</Link>
                    <Link to="/" className="rline-home-link navbar-link">Home</Link>
                    <Link to="/create" className="rline-create-link navbar-link">Create</Link>
                </div>
                <div className="navbar-right-section">
                    {
                        auth.token !== "" ? (
                            <>
                                <Link to="/profile" className="navbar-profile-link navbar-link">{auth.user.username}</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-login-link navbar-link">Sign In</Link>
                                <Link to="/register" className="navbar-register-link navbar-link">Sign Up</Link>
                            </>    
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar;