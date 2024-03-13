import React from 'react'
import {toast} from 'react-toastify'
import { loginUser } from '../services/user-service'
import { useAuth } from '../context/AuthContext'
import AlreadyLoggedGuard from '../guards/AlreadyLoggedguard'
function Login() {
    const {setToken} = useAuth()
    const login = async (e: React.FormEvent) => {
        e.preventDefault()
        const data:any = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
        try {
            const token =  await loginUser(data["email"], data["password"])
            localStorage.setItem('token', JSON.stringify(token))
            setToken(token)
            toast.success("logged in successfully?")
        } catch(e: any) {
            toast.error(e.message)
        }
    }

    return (
        <form onSubmit={login} className="vstack gap-3 col-md-7 mx-auto">
            <h1 className='text-center p-2 font-bold text-[32px]'>Login</h1>
            <div className="form-floating">
                <input type="email" name="email" className="form-control" id="floatingInput" placeholder="" />
                <label htmlFor="floatingInput">Email</label>
            </div>
            <div className="form-floating">
                <input type="password" name="password" className="form-control" id="floatingPassword" placeholder="" />
                <label htmlFor="floatingPassword">Password</label>
            </div>
            <button className="text-white bg-[var(--color-green-light-2)] font-bold text-[20px] hover:opacity-[0.8] p-2 rounded-md" type="submit">Login</button>
        </form>)
}

export default AlreadyLoggedGuard(Login)