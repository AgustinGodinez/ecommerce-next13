import { ENV } from "@/utils"
import jwtDecode from "jwt-decode"

export class Token {
    setToken(token) {
        localStorage.setItem(ENV.TOKEN, token)
    }
    getToken(){
        return localStorage.getItem(ENV.TOKEN)
    }

    removeToken(){
        return localStorage.removeItem(ENV.TOKEN)

    }

    hasExpired(token){
        const tokenDecode =jwtDecode(token);
        const expereDate = tokenDecode.exp*1000;
        const currenDate = new Date().getTime()

        if (currenDate>expereDate){
            return true
        }
        return false 
    }
}