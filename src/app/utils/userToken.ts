import { envVars } from "../envConfig"
import { generateToken } from "./jwt"


export const createUserTokens = (payload: { id: string, email: string, role: string }) => {

    const accessToken = generateToken(payload, envVars.ACCESS_TOKEN_SECRETE, envVars.ACCESS_TOKEN_EXPIRE)

    const refreshToken = generateToken(payload, envVars.REFRESH_TOKEN_SECRET, envVars.REFRESH_TOKEN_EXPIRE)


    return {
        accessToken,
        refreshToken
    }
}