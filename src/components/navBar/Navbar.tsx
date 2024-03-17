import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner"
import {toast} from 'react-toastify';

import {Modal} from 'antd'
const navBarStyle = "p-4 bg-white flex flex-row items-center justify-between border-[1px] border-[lightgray]"
export default function Navbar() {


    const {user,loading,logOut} = useAuth()

    const AuthButtons = useCallback(() => {
        if(loading) {
            return <Spinner spinnerSize="sm"/>
        }
        if(!user) {
            return <div className="flex flex-row gap-2">
                 <Link to="/login" className="text-black font-bold">Login</Link>
                 <Link to="/register" className="text-black font-bold">Register</Link>
            </div>
        }
        if(user) {
            return <div className="flex flex-row gap-4 items-center">
                 <Link to="/profile" className="text-black font-bold">Profile</Link>
                 <div className="text-black" onClick={() => {
                    Modal.confirm({
                        title: "Safe south",
                        content:"Are you sure want to log out?",
                        onOk: () =>  {
                            logOut()
                            toast.info("Logged out succesfully")
                        },
                    })
                 }}>Log out</div>
            </div>
        }
    }, [user, loading])

   return  <nav className={navBarStyle}>
    <Link to="/" className=" font-bold text-[black]">
        SafeSouth
    </Link>
    <div>
        <AuthButtons/>
    </div>
   </nav>
}