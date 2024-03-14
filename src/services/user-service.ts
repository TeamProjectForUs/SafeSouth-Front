import { CredentialResponse } from "@react-oauth/google"
import axios from 'axios'
import { IToken, IUser } from "../@Types"


export const registrUser = (user: Partial<IUser>) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("Registering user...")
        console.log(user)
        axios.post("/auth/register", user).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}
export const loginUser = (email: string, password: string) => {
    return new Promise<IToken>((resolve, reject) => {
        console.log("Logging in user...")
        axios.post("/auth/login", {email, password}).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}

export const googleSignin = (credentialResponse: CredentialResponse) => {
    return new Promise<IUser>((resolve, reject) => {
        console.log("googleSignin ...")
        axios.post("/auth/google", credentialResponse).then((response) => {
            console.log(response)
            resolve(response.data)
        }).catch((error) => {
            console.log(error)
            reject(error)
        })
    })
}