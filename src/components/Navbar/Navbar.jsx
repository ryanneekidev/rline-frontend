import { useAuth } from "../../utilities/AuthProvider";
import { Link } from 'react-router-dom';

function Navbar() {
    const auth = useAuth();

    return (
        <>
            <div className="navbar">
                <div className="navbar-left-section">
                    <Link to="/" className="rline-logo-link">RLine</Link>
                </div>
                <div className="navbar-right-section">
                    {
                        auth.token !== "" ? (
                            <>
                                <Link to="/profile" className="navbar-profile-link">{auth.user.username}</Link>
                                <Link to="/create" className="navbar-create-link">Create</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="navbar-login-link">Login</Link>
                                <Link to="/register" className="navbar-register-link">Register</Link>
                            </>    
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Navbar;