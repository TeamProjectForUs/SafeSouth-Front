import { IPost, IPostWithOwner, IUser } from "../../@Types";
import {  faComment} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { usePosts } from "../../context/PostContext";
import { useAuth } from "../../context/AuthContext";

export interface IPostProps {
    post: IPostWithOwner
}

export default function Post({post}: IPostProps) {
    const {openActivePost} = usePosts()
    const {user} = useAuth()
    return (
        <div className="p-2 text-right rtl flex flex-row items-center gap-4" dir="rtl">
            {typeof post.owner === 'object' && <img  className="rounded-full w-[70px] h-[70px]" src={post.owner.imgUrl}/>}
            
            <div className="grid gap-[2px]">
                <div>
                    {post.post_owner_first_name + "  " + post.post_owner_last_name}
                </div>
                <h1>
                    <p>
                        {post.message}
                    </p>
                    <p className="text-[gray]">
                        {post.location}, תאריכים: &nbsp; {post.date_start.toDateString()} - {post.date_end.toDateString()}
                    </p>
                </h1>

                <div className="flex items-center gap-2" onClick={() => {
                    openActivePost(post)
                }}>
                <FontAwesomeIcon icon={faComment}/>
                {post.comments.length ?
                <span>{post.comments.length} Comments</span>
                : <span>No comments</span>} 
                    </div>               
            </div>
          
        </div>
    );
}
