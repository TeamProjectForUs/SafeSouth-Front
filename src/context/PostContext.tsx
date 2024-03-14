import React, { useEffect, useState } from "react";
import { IComment, ICommentWithUser, IPost, IPostWithOwner } from "../@Types";
import postService from "../services/post-service";
import { useAuth } from "./AuthContext";
export interface IPostContext {
    posts: IPostWithOwner[],
    addPost: (post: Partial<IPost>, imageFile?: File) => Promise<IPostWithOwner| null>
    deletePost: (postId: string) => Promise<IPostWithOwner | null>
    editPost: (post: Partial<IPost>, imageFile?: File) => Promise<IPostWithOwner | null>
    deleteComment: (postId:string) => Promise<IComment | null>
    addComment : (postId:string, comment: Partial<IComment>) => Promise<ICommentWithUser | null>
}

const PostContext = React.createContext<IPostContext | null>(null)


export const PostContextProvider = ({children} : {children: React.ReactNode}) => {
    const [posts, setPosts] = useState<IPostWithOwner[]>([])
    const {user} = useAuth()

    useEffect(() => {
        const fetchPosts = async () => {
                try {
                    const res = (await postService.getAllPosts()).res
                    if(res.data) {
                        const posts = res.data
                        setPosts(posts)
                    }
                } catch(e) {
                    console.error(e)    
                }
        }
        fetchPosts()
    }, [])
    

    const addComment = async (postId:string, comment: Partial<IComment>) => {
        try {
            if(user)
                comment.comment_owner_name = user?.first_name + " " + user?.last_name
           const res = (await postService.addComment(postId, comment)).res
           if(res.data) {
            const posted = res.data
            setPosts(posts.map(post => post._id === postId ? {...post, comments: [...post.comments, res.data]}: post))
            return posted
           }
        } catch(e) {
            console.error(e)
        }   
        return null
    }
    const deleteComment = async (commentId:string) => {
        try {
           const res = (await postService.deleteComment(commentId)).res
           if(res.data) {
            const posted = res.data
            setPosts(posts.map(post => post._id === res.data.post ? {...post, comments: post.comments.filter(c => c._id !== commentId)}: post))
            return posted
           }
        } catch(e) {
            console.error(e)
        }   
        return null
    }

    const addPost = async (post: Partial<IPost>, imageFile?: File) => {
        try {
            if(user)  {
                post.post_owner_first_name = user?.first_name
                post.post_owner_last_name = user?.last_name
            }
           const res = (await postService.addPost(post, imageFile)).res
           if(res.data) {
            const posted = res.data
            setPosts([...posts, posted])
            return posted
           }
        } catch(e) {
            console.error(e)
        }   
        return null
    }

    const editPost = async (post: Partial<IPost>, imageFile?: File) => {
        try {
           const res = (await postService.editPost(post, imageFile)).res
           if(res.data) {
            const posted = res.data
            setPosts(posts.map(p => p._id === post._id ? res.data :p))
            return posted
           }
        } catch(e) {
            console.error(e)
        }   
        return null
    }

     
    const deletePost = async (postId: string) => {
        try {
           const res = (await postService.deletePost(postId)).res
           if(res.data) {
                const deleted = res.data
                setPosts(posts.filter(p => p._id !== postId))
                return deleted
           }
        } catch(e) {
            console.error(e)
        }   
        return null
    }
    

    return <PostContext.Provider value={{
         posts, 
         addPost,
         deletePost,
         editPost,
         addComment,
         deleteComment
        }}>
        {children}
    </PostContext.Provider>
}
export const usePosts = () => {

    const context = React.useContext(PostContext)
    if(!context) {
        throw new Error("Post context not provided")
    }
    return context
}