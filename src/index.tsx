import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { GoogleOAuthProvider } from '@react-oauth/google'

console.log('Google Client ID:', process.env.REACT_APP_GOOGLE_CLIENT_ID)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}>
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
)

reportWebVitals()
