import { IPost } from "../../@Types";
import Post from "./Post";



export interface IPostListProps {
    posts: IPost[]
}

export default function PostList({posts}: IPostListProps) {

    return <div className="flex flex-col gap-2">
        {posts.map(post => <div>
            <Post post={post} key={post._id}/>
            <hr/>
        </div>)}
    </div>

}