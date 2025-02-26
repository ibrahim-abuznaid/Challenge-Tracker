import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { disableBrowserAlerts } from './utils/alertUtils'
import { initDarkTheme } from './utils/theme'

// Disable all browser alerts
disableBrowserAlerts()

// Initialize dark theme
initDarkTheme()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
) 