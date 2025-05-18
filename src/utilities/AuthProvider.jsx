import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState({});
    const [token, setToken] = useState("");

    const navigate = useNavigate();

    const login = async (username, password) => {
        try {
            console.log('request sent!');
            const response = await fetch(`http://127.0.0.1:3000/api/login`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `username=${username}&password=${password}`
            });

            console.log('request received!');
            
            console.log('start decoding request!');
            const json = await response.json();
            console.log('request decoded!');
            
            if(json.token){
                console.log('start setting token!');
                setToken((prev)=>json.token);
                console.log('token set!');
                console.log('start setting user!');
                setUser(jwtDecode(json.token));
                console.log('user set!');
                return;
            }
            throw new Error(json.message)
        } catch (err) {
            console.error(err)
        }
    }

    const logout = () => {
        if(token!==""&&user){
            setUser({});
            setToken("");
            navigate('/login')
        }
    }

    const register = async (username, password, email) => {
        try {
            const response = await fetch("http://127.0.0.1:3000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `username=${username}&password=${password}&email=${email}`
            })
            const json = await response.json();
            console.log(json);
            navigate('/login');
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
