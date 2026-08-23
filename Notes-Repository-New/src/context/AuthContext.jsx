

import { createContext , useState } from "react";

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const[user, setUser] = useState(()=>{
        const storedUser = localStorage.getItem("user");

        return storedUser?JSON.parse(storedUser):null;

    });
     const [token, setToken] = useState(() => {
        return localStorage.getItem("token");
    });
     const login = (userData, userToken) => {
        localStorage.setItem(
            "user",
            JSON.stringify(userData)
        );

        localStorage.setItem("token", userToken);

        setUser(userData);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
