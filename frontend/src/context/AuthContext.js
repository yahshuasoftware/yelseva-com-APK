import React, {createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    const [jwtToken, setJwtToken] = useState(null);

    const login = (token)=>{
        setJwtToken(token);
    };

    const logout = (token) =>{
        setJwtToken(null);
    };

    return(
        <AuthContext.Provider value={{jwtToken,login,logout}}>
            {children}
        </AuthContext.Provider>
    );

}