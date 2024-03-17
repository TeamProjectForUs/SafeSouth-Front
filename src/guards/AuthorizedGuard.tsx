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
                <p>
                    <span>.הינך חייב להיות מחובר על מנת לצפות בעמוד זה</span>
                </p>
                <Link to="/login">התחבר</Link>
            </div>
        }
        return <Component {...props as any}/>
    }
}