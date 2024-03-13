import { FunctionComponent } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";


export default function AuthorizedGuard<T>(
    Component: FunctionComponent<T>
){
    return function useGuard(props: T) {
        const { user,loading } = useAuth()
        if(!user && !loading) {
            return <div>
                <span>You must be logged in to view this page</span>
                <Link to="/login">Login now</Link>
            </div>
        }
        return <Component {...props as any}/>
    }
}