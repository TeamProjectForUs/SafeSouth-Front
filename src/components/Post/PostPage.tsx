import { useMemo, useState } from "react";
import { IComment, IPost } from "../../@Types";
import {faClose} from '@fortawesome/free-solid-svg-icons';
import { usePosts } from "../../context/PostContext";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { dateToString } from "./CreatePost";

export function CommentList2<T extends IComment[]>({comments} : {comments: T}) {
    return  <div className="max-h-[400px] py-[1rem] w-[50%]  px-[1rem] max-w-[400px] no-scrollbar min-w-[200px] overflow-y-scroll">
     {comments.map(comment => 
     <div key={comment._id} className="p-4">
     <span className="py-2 font-bold"> {comment.comment_owner_name}</span>
     <p className="rounded-full p-2 bg-[lightgray]">{comment.message}</p>
     </div>)}
 </div>
}

export default function PostPage() {
    const  {posts} = usePosts()

    const [showingImages,setShowingImages] = useState(false)
    const {id} = useParams()
    const post = useMemo(() => posts.find(p => p._id===id), [id,posts])
    if(!post) return <div>Post not found</div>
    return (
        <div className="p-2 w-fit mx-auto flex flex-col items-center" style={{ textAlign: 'right' }}>

            <img src={post.owner.imgUrl} className="w-[100px] object-contain h-[100px] rounded-full" alt="No provided"/>
            <div>
                {post.post_owner_first_name + "  " + post.post_owner_last_name}
            </div>
            <h1>
                 {post.title}
                 <p>
                    {post.message}
                </p>
                <p className="w-max">
                    {post.location}, תאריכים: &nbsp; {dateToString(post.date_start, true)} - {dateToString(post.date_end,true)}
                </p>
            </h1>
          <br/>
          <div className="flex flex-row items-center gap-4">
          <div>פרטים:</div>
            <div className=" text-gray grid grid-cols-2 gap-2">
                <div className="flex gap-2">
                    <label className="flex flex-row items-center gap-2">
                        <input type="checkbox" checked={post.handicap_home} disabled />
                       <span> בית נגיש לנכים.</span>
                    </label>
                </div>
                <div className="flex">
                    <label className="flex flex-row items-center gap-2">
                        <input type="checkbox" checked={post.animals_home} disabled />
                       <span> מקבלים חיות מחמד.</span>
                    </label>
                </div>
                <div className="flex">
                    <label className="flex flex-row items-center gap-2">
                        <input type="checkbox" checked={post.kosher_home} disabled />
                        <span>בית שומר כשרות.</span>
                    </label>
                </div>
                <div className="flex-grow-1">
                    <label className="flex flex-row items-center gap-2">
                        <input type="checkbox" checked={post.shabat_save} disabled />
                        <span>בית שומר שבת.</span>
                    </label>
                </div>
            </div>
            </div>
            <br/>
            <div dir="rtl">
                .יכולים לארח עד: &nbsp;&nbsp; {post.capacity ?? 1}  נפשות
            </div>
            <div>
                טלפון: &nbsp;&nbsp; {post.post_owner_phone}
            </div>
            <b className="pt-3">
            <div>תגובות</div>
            </b>
            <button className="border-[1px] translate-x-[-72px] border-[gray] rounded-full p-2 self-end " onClick={() => {
                const defaultImage = "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                if(post.imgUrl ===defaultImage ) {
                    toast.info("This post has no images..")
                    return;
                }
                setShowingImages(true)
            }}>תמונות</button>
            <CommentList2 comments={post.comments}/>
            {showingImages && <div className="fixed bg-[rgba(0,0,0,0.5)] grid items-center top-0 bottom-0 left-0 right-0">
                <div className="min-w-[300px] rounded-lg grid place-items-center grid-cols-1 grid-rows-1 p-4 w-[60%] max-w-[600px] mx-auto min-h-[300px] bg-white">
                    <img src={post.imgUrl} className="object-contain w-[200px] h-[200px] rounded-full" alt="No provided"/>
                </div>
                <FontAwesomeIcon color="white" size='3x' className="fixed cursor-pointer top-[2rem] right-[2rem]" icon={faClose} onClick={() => {setShowingImages(false)}}/>
      
                </div>}          
        </div>      
    );
}