import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");

    const [loginError, setLoginError] = useState("");
    const [registerError, setRegisterError] = useState("");

    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            setRegisterError("")
            setLoginError("");
            const response = await fetch(`http://backend-test-production-2c47.up.railway.app/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${username}&password=${password}`
            });
            const json = await response.json();
            
            if(json.token){
                setToken((prev)=>json.token);
                setUser(jwtDecode(json.token));
                setRegisterError("")
                setLoginError("");
                return;
            }

            setLoginError(json.message)
            throw new Error(json.message)
        } catch (err) {
            console.error(err)
        }
    }

    const logout = () => {
        if(token!==""&&user){
            setUser({});
            setToken("");
            setRegisterError("")
            setLoginError("");
            navigate('/login')
        }
    }

    const register = async (username, password, confirmedPassword, email) => {
        try {
            setRegisterError("")
            setLoginError("");
            const response = await fetch("http://backend-test-production-2c47.up.railway.app/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${username}&password=${password}&confirmedPassword=${confirmedPassword}&email=${email}`
            })
            const json = await response.json();
            
            if(json.pass){
                navigate('/login')
                setRegisterError("")
                setLoginError("");
                return;
            }

            setRegisterError(json.message)
            throw new Error(json.message)
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <AuthContext.Provider value={ {user, token, loginError, registerError, login, logout, register} }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
