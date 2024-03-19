import PostList from "../components/Post/PostList"
import { useAuth } from "../context/AuthContext"
import AuthorizedGuard from "../guards/AuthorizedGuard"


function Profile() {

    const {user} = useAuth()
    if(!user) return null

    return <div className="mt-[1rem]">
       <div className="flex flex-col items-center gap-[1px]">
       <img src={user.imgUrl} height={100} className="rounded-full object-contain w-[100px] h-[100px]"></img>
        <p className="font-bold p-2">
            {user.first_name + " " + user.last_name}
        </p>
       </div>
       <PostList posts={user.posts}/>
    </div>
}

export default AuthorizedGuard(Profile)