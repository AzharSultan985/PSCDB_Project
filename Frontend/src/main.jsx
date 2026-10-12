import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from '../Context/AuthContext.jsx'
import { AlertProvider } from '../Context/Alert.jsx'
import { StudentProvider } from '../Context/studentContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AlertProvider>
    <AuthProvider>
 <StudentProvider>
  <App />
</StudentProvider>
    </AuthProvider>
      </AlertProvider>
  </StrictMode>,
)
