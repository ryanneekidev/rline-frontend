import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");

    const login = async (username, password) => {
        try {
            const response = await fetch(`http://127.0.0.1:3000/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${username}&password=${password}`
            });
            const json = await response.json();
            setToken((prev)=>json.token)
            setUser(jwtDecode(json.token))
        } catch (err) {
            console.error(err)
        }
    }

    const logout = () => {
        setUser({});
        setToken("")
    }

    const register = async (creds) => {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${creds.username}&password=${creds.password}&email=${creds.email}`
            })
            const json = await response.json();
            console.log(json)
        } catch (err) {
            console.error(err)
        }
    }

    return(
        <AuthContext.Provider value={ {user, token, login, logout, register} }>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
}
