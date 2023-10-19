'use client'

import { Cart, Token, User } from "@/api";

const { createContext, useState, useEffect } = require("react");

const tokenCtrl = new Token();
const userCtrl = new User()
const cartCtrl = new Cart()

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async () => {
            const token = tokenCtrl.getToken()

            if (token) {
                const response = await userCtrl.getMe();
                setUser(response)
                await login(token)
            }else {
                logout();
                setLoading(false);
                return;
            }

            if (tokenCtrl.hasExpired(token)) {
                logout()
            }
        })();
    }, [])

    const login = async (token) => {
        try {
            setLoading(false)
            tokenCtrl.setToken(token)
            const response = await userCtrl.getMe();
            setUser(response)
            setToken(token)
        } catch (error) {
            console.error(error);
            setLoading(false)
        }
    }

    const logout = () => {
        tokenCtrl.removeToken()
        cartCtrl.deleteAll()
        
        setToken(null)
        setUser(null)
    }

    const updateUser = (key, value) => {
        setUser({
            ...user,
            [key]: value
        })
    }

    const data = {
        accessToken: token,
        user,
        login,
        logout,
        updateUser,
    }

    if (loading) return null

    return (
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}