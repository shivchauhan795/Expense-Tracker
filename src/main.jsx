import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import AddExpense from './components/AddExpense.jsx'
import ShowExpense from './components/ShowExpense.jsx'
import { ItemsContext } from './context/context'

const Main = () => {
  const [form, setForm] = useState({ name: '', price: '', category: '' })
  const [formdata, setFormdata] = useState([])
  useEffect(() => {
    let expenses = localStorage.getItem("expenses");
    if (expenses) {
      setFormdata(JSON.parse(expenses));
    }
  }, []);

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
  ]);

  return (
    <React.StrictMode>
      <ItemsContext.Provider value={{ formdata, setFormdata, form, setForm }}>
        <RouterProvider router={router} />
      </ItemsContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Main />);