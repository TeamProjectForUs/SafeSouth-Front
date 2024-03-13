

import Registration from "./components/Registration"
import {Routes, Route, Link} from 'react-router-dom'
import Home from "./pages/Home"

import {ToastContainer} from 'react-toastify'
import Login from "./components/Login"
import Navbar from "./components/navBar/Navbar"
function App() {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route index  element={<Home/>}/>
        <Route path="/register"  element={<Registration/>}/>
        <Route path="/login"  element={<Login/>}/>
      </Routes>
      <ToastContainer/>
    </div>
  )
}


export default App