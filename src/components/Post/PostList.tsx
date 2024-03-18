import { IPostWithOwner } from "../../@Types";
import Post from "./Post";


export interface IPostListProps {
    posts: IPostWithOwner[]
}

export default function PostList({posts}: IPostListProps) {

    return <div className="grid items-center text-[22px] gap-4  w-[50%] min-w-[400px] mx-auto">
        {posts.map(post => <div>
            <Post post={post} key={post._id}/>
        </div>)}
    </div>
}