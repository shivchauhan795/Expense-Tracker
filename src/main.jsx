import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import AddExpense from './components/AddExpense.jsx'
import ShowExpense from './components/ShowExpense.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <><Navbar /><App /></>
  },
  {
    path: "/add",
    element: <><Navbar /><AddExpense /></>
  },
  {
    path: "/show",
    element: <><Navbar /><ShowExpense /></>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
