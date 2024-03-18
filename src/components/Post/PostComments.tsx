import React, { useRef } from "react"
import { usePosts } from "../../context/PostContext"
import {  faShare,faClose} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAuth } from "../../context/AuthContext";
import sendIcon from '../../assets/icons8-send-48.png'
import { toast } from "react-toastify";
import { Link } from "react-router-dom";



export default function PostComments() {

    const {activePost, addComment, openActivePost, closeActivePost} = usePosts()
    const ref = useRef<HTMLInputElement | null>(null)
    const {user}  = useAuth()

    const onSubmitComment = async () => {
        const val = ref.current?.value
        if(!val) return toast.info("Comment must not be empty")
        const cmt = {
            message: val,
            comment_owner_name: user?.first_name + " " + user?.last_name
        }
        const commentPosted = await addComment(activePost!._id, cmt)
        if(commentPosted && activePost) {
            openActivePost({...activePost, comments: [...activePost.comments, commentPosted]})
            toast.success("Comment posted")
        }  else {
            toast.error("Could not post comment, please try again later")
        }
    }
    if(!activePost) return null
    return <div className="fixed grid items-center top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.5)]">
       <FontAwesomeIcon color="white" size='3x' className="fixed cursor-pointer top-[2rem] right-[2rem]" icon={faClose} onClick={() => closeActivePost()}/>
      
       <div className="flex flex-col relative py-[2rem]  items-center min-w-[400px] w-[60%] mx-auto max-w-[800px] min-h-[200px] bg-white rounded-md">
       <div className="max-h-[400px] py-[1rem] w-full px-[1rem] max-w-[80%] overflow-y-scroll">
           <h2 className="font-bold text-[20px]">אל תתביישו, הוסיפו תגובה על הפוסט:</h2>
            {activePost.comments.map(comment => 
            <div key={comment._id} className="p-4">
            <span> {comment.comment_owner_name}</span>
            <p>{comment.message}</p>
            <hr/>
            </div>)}
        </div>
        {activePost.comments.length < 1  &&<div className="text-[24px] mt-[1.5rem] mb-[.5rem]">
           !תהיה הראשון להגיב על הפוסט
            </div>}

           {!user && <div className="text-[gray] text-[20px] text-center">
               יש  <Link className="text-blue-500" to="/login" onClick={() => closeActivePost()}>להתחבר</Link> .על מנת להגיב על הפוסט
            </div>}

        {user && <div className="w-[80%] mt-[1rem]" style={{display:'grid', gridTemplateColumns:'85% 15%', placeItems:'center', marginInline:'auto'}}>
            <input type="text" className="outline-none  p-3 w-full border-[1px] border-[lightgray] rounded-md" placeholder="Post a comment.." ref={ref}/>
           <div>
           <img  src={sendIcon} width={30} height={30} onClick={onSubmitComment}/>
            </div>
        </div>}
       </div>
    </div>
}