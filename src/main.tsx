import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { PostContextProvider } from './context/PostContext.tsx'

axios.defaults.baseURL = "http://localhost:3000"

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if(token) { 
    const {accessToken} = JSON.parse(token)
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="330327326922-t7m250jn2epuq62c1b224nv4621toq00.apps.googleusercontent.com">
     <BrowserRouter>
     <AuthContextProvider>
      <PostContextProvider>
        <App />
      </PostContextProvider>
     </AuthContextProvider>
     </BrowserRouter>
  </GoogleOAuthProvider>
)