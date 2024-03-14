import { IPost } from "./@Types"

interface PostProps {
    post: IPost
}

function Post({ post }: PostProps) {
    return (
        <div>
            <h1>
                owner:{post.post_owner_first_name + " " + post.post_owner_last_name } 
                title:{post.title}
            </h1>
            <h2>{post.message}</h2>
        </div>
    )
}

export default Post