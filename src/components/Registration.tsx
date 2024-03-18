import { ChangeEvent, useRef, useState } from 'react'
import avatar from '../assets/avatar.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { uploadPhoto } from '../services/file-service'
import { registrUser, googleSignin } from '../services/user-service'
import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
import AlreadyLoggedGuard from '../guards/AlreadyLoggedguard'
import { IUser } from '../@Types'
import Spinner from './Spinner'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function Registration() {
    const [imgSrc, setImgSrc] = useState<File>()
    const [loading,setLoading] = useState(false)
    const nav = useNavigate()
    const fileInputRef = useRef<HTMLInputElement>(null)
    
    const emailInputRef = useRef<HTMLInputElement>(null)
    const firstNameRef = useRef<HTMLInputElement>(null)
    const lastNameRef = useRef<HTMLInputElement>(null)
    const passwordInputRef = useRef<HTMLInputElement>(null)
    const imgSelected = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
        if (e.target.files && e.target.files.length > 0) {
            setImgSrc(e.target.files[0])
        }
    }
    const selectImg = () => {
        console.log("Selecting image...")
        fileInputRef.current?.click()
    }

    const register = async () => {
    
        if (emailInputRef.current?.value && passwordInputRef.current?.value
            && firstNameRef?.current?.value && lastNameRef?.current?.value
            && imgSrc) {
            const url = await uploadPhoto(imgSrc!);
            const user: IUser = {
                email: emailInputRef.current?.value,
                password: passwordInputRef.current?.value,
                first_name: firstNameRef.current?.value,
                last_name: lastNameRef.current?.value,
                imgUrl: url,
                posts:[],
            }
            const res = await registrUser(user)
            if(res) {
                nav("/login")
                toast.success("נרשמת בהצלחה, מוזמן להתחבר!:)")
            }
        } else {
            toast.error("בבקשה מלא את כל השדות ובחר תמונת פרופיל:)")
        }
    }

    const onGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
        console.log(credentialResponse)
        try {
            const res = await googleSignin(credentialResponse)
            console.log(res)
        } catch (e) {
            console.log(e)
        }
    }

    const onGoogleLoginFailure = () => {
        console.log("Google login failed")
    }
    return (
        <form className="vstack gap-3 col-md-7 mx-auto">
            <h1 className='text-center p-2 font-bold text-[32px]'>הירשמות</h1>
            <div className="d-flex justify-content-center position-relative">
                <img src={imgSrc ? URL.createObjectURL(imgSrc) : avatar} style={{ height: "230px", width: "230px" }} className="img-fluid" />
                <button type="button" className="btn position-absolute bottom-0 end-0" onClick={selectImg}>
                    <FontAwesomeIcon icon={faImage} className="fa-xl" />
                </button>
            </div>

            <input style={{ display: "none" }} required ref={fileInputRef} type="file" onChange={imgSelected}></input>

            <div className="form-floating">
                <input ref={emailInputRef} required type="email" className="form-control" id="floatingInput" placeholder="" />
                <label htmlFor="floatingInput">אימייל</label>
            </div>
            <div className="form-floating">
                <input ref={firstNameRef} required type="text" className="form-control" id="floatingInput" placeholder="" />
                <label htmlFor="floatingInput">שם פרטי</label>
            </div>

            <div className="form-floating">
                <input ref={lastNameRef}  required type="text" className="form-control" id="floatingInput" placeholder="" />
                <label htmlFor="floatingInput">שם משפחה</label>
            </div>

            <div className="form-floating">
                <input ref={passwordInputRef} required type="password" className="form-control" id="floatingPassword" placeholder="" />
                <label htmlFor="floatingPassword">סיסמה</label>
            </div>
            <button  style={{background: loading ? "gray" : "white", color:'black'}} disabled={loading} type="button" className=" bg-[var(--color-green-light-2)] font-bold text-[20px] hover:opacity-[0.8] p-2 rounded-md" onClick={register}>הירשם</button>

            <GoogleLogin onSuccess={onGoogleLoginSuccess} onError={onGoogleLoginFailure} />

            {loading && <Spinner spinnerSize='lg'/>}
        </form>)
}

export default AlreadyLoggedGuard(Registration)