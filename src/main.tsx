import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename='/pairing-client'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
)
