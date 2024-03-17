

import Registration from "./components/Registration"
import {Routes, Route, Navigate} from 'react-router-dom'
import Feed from "./pages/Feed"
import {ToastContainer} from 'react-toastify'
import Login from "./components/Login"
import Navbar from "./components/navBar/Navbar"
import CreatePost from "./components/Post/CreatePost"
import { useAuth } from "./context/AuthContext"
import { useCallback } from "react"
import Welcome from "./pages/Welcome"
import Profile from "./pages/Profile"
function App() {
  const {user} = useAuth()

  const HomeComponent = useCallback(() => {
    if(user) {
      return <Navigate to="/feed"/>
    }
    return <Welcome/>
  },[user])
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route index element={<HomeComponent/>}/>
        <Route path="/feed"  element={<Feed/>}/>
        <Route path="/register"  element={<Registration/>}/>
        <Route path="/profile"  element={<Profile/>}/>
        <Route path="/login"  element={<Login/>}/>
        <Route path="/create-post"  element={<CreatePost/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}


export default App