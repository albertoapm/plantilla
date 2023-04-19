import {createContext, useCallback, useMemo, useState, useContext} from "react";
import PropTypes from 'prop-types';

const MY_AUTH_APP = 'MY_AUTH_APP'
export const AuthContext = createContext();

export function AuthContextProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem(MY_AUTH_APP) ?? false);

    const login = useCallback(function(){
        //console.log("Login en AuthContext")
        localStorage.setItem(MY_AUTH_APP, true);
        setIsAuthenticated(true); 
    },[]);

    const logout = useCallback(function(){
        localStorage.removeItem(MY_AUTH_APP);
        setIsAuthenticated(false); 
        //console.log("AuthContext", "logOut");
    },[]);

    const value = useMemo(
        ()=>({
            login,
            logout,
            isAuthenticated
        }), 
        [login, logout, isAuthenticated]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthContextProvider.propTypes = {
    chilren: PropTypes.object
};

export function useAuthContext(){
    return useContext(AuthContext);
}