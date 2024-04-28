import { useContext, createContext, useEffect, useState } from "react";

import { parseToken } from '../utils/auth.jsx';

const TokenContext = createContext ({ token: '', useToken: () =>  {} })

const TokenProvider = ({children}) => {
    const [token, setToken] = useState(
        localStorage.getItem('access_token') || null
    )

    useEffect(() => {
        if (token) {
            localStorage.setItem('access_token', token)
        }
    }, [token])


    const isLoggedIn = !!token


    
    const getRawToken = (token) => {
        if (!token){
            const decodedToken = parseToken(token);
            return decodedToken
        }
        
    }

    return (
        <TokenContext.Provider value={{token, setToken, isLoggedIn, getRawToken}}>
            {children}
        </TokenContext.Provider>
    )
}

const useToken = () => {
    return useContext(TokenContext)
}

export default useToken
export{ TokenContext, TokenProvider }