import { createContext, useContext, useState } from "react";


const AuthContext = createContext()

export const useAuth = () => {
    console.log("Logeando");
    const auth = useContext(AuthContext)
    console.log("Valio pija"+auth);
    return auth
}

    export const AuthProvider = ({ children }) => {
        console.log("Doble");
    const [isAuthenticated, setIsAuthenticated] =  useState(false);

        
    const login = () => {
        setIsAuthenticated(true)
    }

    const logout = () => {
        setIsAuthenticated(false)
    }

        return (
            <AuthContext.Provider value = {{isAuthenticated, login, logout}}>
                {children}
            </AuthContext.Provider>
        )
    }
