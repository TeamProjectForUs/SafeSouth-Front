import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from '@fortawesome/free-solid-svg-icons'
import React, { ChangeEvent, useRef, useState } from "react";
import avatar from '../../assets/avatar.jpeg'
import { IPost } from "../../@Types";
import { toast } from "react-toastify";
import Spinner from "../Spinner";
import AuthorizedGuard from "../../guards/AuthorizedGuard";
import { useNavigate } from "react-router";
import { usePosts } from "../../context/PostContext";


function CreatePost() {

    const nav = useNavigate()
    const [imgSrc, setImgSrc] = useState<File | undefined>()
    const [loading,setLoading] = useState(false)
    const {addPost} = usePosts()
    const fileInputRef = useRef<HTMLInputElement>(null)
    const selectImg = () => {
        fileInputRef.current?.click()
    }
    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0])
        }
    }

    async function onSubmitPost(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        const data:any = Object.fromEntries(new FormData(e.target as HTMLFormElement).entries())
        data["kosher_home"] = data["kosher_home"] === 'on'
        data["animals_home"] = data["animals_home"] === 'on'
        data["shabat_save"] = data["shabat_save"] === 'on'
        data["handicap_home"] = data["handicap_home"] === 'on'
        delete data["imgSrc"]
        try {
          
            const newPost: IPost = {...data, imgUrl: imgSrc}
            const res = await addPost(newPost, imgSrc)
            toast.success("Post uploaded successfully! you may view it on your post section in profile page")
            nav("/")    
        } catch(e: any) {
           toast.error(e.message) 
        } finally {
            setLoading(false)
        }

    }
    

    return (
        <form onSubmit={onSubmitPost} className="vstack gap-3 col-md-7 mx-auto w-[80%] max-w-[500px] mb-[1rem]">
            <br/>
            <h1 className='text-center p-2 font-bold text-[32px]'>New Post</h1>
            <div className="d-flex justify-content-center position-relative">
                {imgSrc &&<img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />}
                <label>הוסף תמונה של אזור האירוח</label>
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div>
            <input style={{ display: "none" }} name="imgSrc" ref={fileInputRef} type="file" onChange={imgSelected}></input>
            <div className="form-floating">
                <input type="text" name="post_owner_first_name" required className="form-control" id="floatingInput-5" placeholder="" />
                <label htmlFor="floatingInput-5">שם פרטי:</label>
            </div>
            <div className="form-floating">
                <input type="text" name="post_owner_last_name" required className="form-control" id="floatingInput-6" placeholder="" />
                <label htmlFor="floatingInput-6">שם משפחה:</label>
            </div>
            <div className="form-floating">
                <input type="text" name="location" required className="form-control" id="floatingLocation-7" placeholder="" />
                <label htmlFor="floatingLocation-7">אזור מגורים:</label>
            </div>
            <div className="form-floating">
                <input type="date" name="date_start" required className="form-control" id="floatingInput-3" placeholder="" />
                <label htmlFor="floatingInput-3">יכול לארח מהתאריך:</label>
            </div>
            <div className="form-floating">
                <input type="date" name="date_end" required className="form-control" id="floatingInput-4" placeholder="" />
                <label htmlFor="floatingInput-4">עד התאריך:</label>
            </div>
            <div className="form-floating">
                <input type="number" name="capacity" required className="form-control" id="floatingInput-18" placeholder="" />
                <label htmlFor="floatingInput-18">מספר אורחים אפשרי:</label>
            </div>
            <div className="form-floating">
                <input type="tel" name="post_owner_phone" required className="form-control" id="floatingInput-17" placeholder="" />
                <label htmlFor="floatingInput-16">מספר טלפון ליצירת קשר:</label>
            </div>
            <div className="form-floating">
                <input type="email" name="post_owner_email" required className="form-control" id="floatingInput-16" placeholder="" />
                <label htmlFor="floatingInput-16">אימייל:</label>
            </div>

            <div className="d-flex">
                <div className="form-check flex-grow-1">
                    <input type="checkbox" name="kosher_home" className="form-check-input" id="floatingLocation-8" placeholder="" />
                    <label htmlFor="floatingLocation-8">בית שומר כשרות.</label>
                </div>
                <div className="form-check flex-grow-1">
                    <input type="checkbox" name="shabat_save" className="form-check-input" id="floatingLocation-9" placeholder="" />
                    <label htmlFor="floatingLocation-9">בית שומר שבת.</label>
                </div>
            </div>
            <div className="d-flex">
                <div className="form-check flex-grow-1">
                    <input type="checkbox" name="animals_home" className="form-check-input" id="floatingLocation-10" placeholder="" />
                    <label htmlFor="floatingLocation-10">מקבלים עם חיות מחמד.</label>
                </div>
                <div className="form-check flex-grow-1">
                    <input type="checkbox" name="handicap_home" className="form-check-input" id="floatingLocation-11" placeholder="" />
                    <label htmlFor="floatingLocation-11">בית נגיש לנכים.</label>
                </div>
            </div>
            <div className="form-floating">
                <input type="text" name="title" required className="form-control" id="floatingInput-1" placeholder="" />
                <label htmlFor="floatingInput-1">כותרת הפוסט:</label>
            </div>
            <div className="form-floating">
                <input type="text" name="message" required className="form-control" id="floatingInput-2" placeholder="" />
                <label htmlFor="floatingInput-2">תוכן הפוסט:</label>
            </div>

            <button style={{background: loading ? "gray" : "white"}} disabled={loading} className="text-black bg-[white] border-[1px] border-[black] mx-auto max-w-[300px] w-[50%] font-bold text-[20px] hover:opacity-[0.8] px-4 py-2 rounded-full flex items-center justify-center" type="submit">Create post</button>
            
            {loading && <Spinner spinnerSize='lg'/>}
        </form>)
}

export default AuthorizedGuard(CreatePost)