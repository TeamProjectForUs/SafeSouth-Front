import { useState } from "react"
import PostList from "../components/Post/PostList"
import { useAuth } from "../context/AuthContext"
import AuthorizedGuard from "../guards/AuthorizedGuard"
import {faClose} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Profile() {

    const {user} = useAuth()
    if(!user) return null
    const [showingImages, setShowingImages] = useState(false)
    return <div className="mt-[1rem]">
       <div className="flex flex-col items-center gap-[1px]">
       <img onClick={() => {
        if(user.imgUrl) {
            setShowingImages(true)
        }
       }}src={user.imgUrl} height={100} className="rounded-full object-contain w-[100px] h-[100px]"></img>
        <p className="font-bold p-2">
            {user.first_name + " " + user.last_name}
        </p>
       </div>
       <PostList posts={user.posts}/>
       {showingImages  &&<div className="fixed bg-[rgba(0,0,0,0.5)] grid items-center top-0 bottom-0 left-0 right-0">
                <div className="min-w-[300px] rounded-lg grid place-items-center grid-cols-1 grid-rows-1 p-4 w-[60%] max-w-[600px] mx-auto min-h-[300px] bg-white">
                    <img src={user.imgUrl} className="object-contain w-[200px] h-[200px] rounded-full" alt="No provided"/>
                </div>
                <FontAwesomeIcon color="white" size='3x' className="fixed cursor-pointer top-[2rem] right-[2rem]" icon={faClose} onClick={() => {setShowingImages(false)}}/>
        </div>} 
    </div>
}

export default AuthorizedGuard(Profile)