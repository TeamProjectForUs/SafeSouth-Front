import { Link } from "react-router-dom"
import PostList from "../components/Post/PostList"
import { usePosts } from "../context/PostContext"
import { faAdd} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default function Feed() {
    const {posts}= usePosts()
    return <div>
        <Link to="/create-post" className="p-2 ">
            <FontAwesomeIcon icon={faAdd} className="fa-xl" />
        </Link>
        <PostList posts={posts}/>
    </div>
}