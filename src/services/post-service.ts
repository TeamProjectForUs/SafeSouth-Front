import  { CanceledError } from "axios"
import axios from 'axios'
import { PostData } from "../Post"

export { CanceledError }
const getAllPosts = () => {
    const abortController = new AbortController()
    const req = axios.get<PostData[]>('studentpost', { signal: abortController.signal })
    return { req, abort: () => abortController.abort() }
}

export default { getAllPosts }