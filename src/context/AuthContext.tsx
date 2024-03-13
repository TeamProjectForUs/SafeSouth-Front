import React, { ReactNode, useEffect, useState } from "react";
import { IUser } from "../services/user-service";
import { IToken } from "../@Types";
import axios from "axios";

export interface IAuthContext {
    loading: boolean
    setLoading: (b: boolean) => void
    user: IUser | null
    token: IToken | null
    setUser: (user: IUser) => void
    setToken: (token: IToken) => void

    logOut: () => void
}

const AuthContext = React.createContext<IAuthContext | null>(null) 


export function AuthContextProvider({ children } : {children: ReactNode}) {


    const [user,setUser] = useState<IUser | null>(null)
    const [loading,setLoading] = useState<boolean>(true)
    const [token,setToken] = useState<IToken | null>(null)
    useEffect(() => {
        const t = localStorage.getItem('token')
        if(t) {
            setToken(JSON.parse(t))
        }
    },[])

    useEffect(() => {
        if(token) {
            setLoading(true)
            const fetchUser = async () => {
                try {
                    const res = await axios.get("/auth/me")
                    if(res.data) {
                        setUser(res.data as IUser)
                    }
                }catch(e) {}
                setLoading(false)
            }
            fetchUser()
         }else {
            setLoading(false)
        }
    },[token])


    const logOut = () => {
        setLoading(false)
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
    }

    return <AuthContext.Provider value={{
        token,
        setToken,
        user,
        setUser,
        loading,
        setLoading,
        logOut}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {

    const context = React.useContext(AuthContext)
    if(!context) {
        throw new Error("Auth context not provided")
    }
    return context
}