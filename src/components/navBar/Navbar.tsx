import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Spinner from "../Spinner"
import {toast} from 'react-toastify';

import {Modal} from 'antd'
const navBarStyle = "p-4 bg-[var(--color-green-light)] flex flex-row items-center justify-between"
export default function Navbar() {


    const {user,loading,logOut} = useAuth()

    const AuthButtons = useCallback(() => {

        if(loading) {
            return <Spinner spinnerSize="sm"/>
        }
        if(!user) {
            return <div>
                 <Link to="/login" className="text-white font-bold">Login</Link>
                 <Link to="/register" className="text-white font-bold">Register</Link>
            </div>
        }
        if(user) {
            return <div className="flex flex-row gap-4 items-center">
                 <Link to="/profile" className="text-white font-bold">Profile</Link>
                 <div className="text-white" onClick={() => {
                    Modal.confirm({
                        title: "Safe south",
                        message:"Are you sure want to log out?",
                        onOk: () =>  {
                            logOut()
                            toast.info("Logged out succesfully")
                        },
                    })
                 }}>Log out</div>
            </div>
        }
       
    },[user])
   return  <nav className={navBarStyle}>
    <div className=" font-bold text-[black]">
        SafeSouth
    </div>
    <div>
        <AuthButtons/>
    </div>
   </nav>
}