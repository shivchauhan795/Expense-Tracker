import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='flex justify-between bg-slate-700 text-white h-14 items-center px-28'>
      <h2 className='text-2xl uppercase'>
        <Link to={"/"}>Expense Tracker</Link>
      </h2>
      <div className="navItems flex gap-3">
        <Link to={"/add"}>Add</Link>
        <Link to={"/show"}>Show</Link>
      </div>
    </div>
  )
}

export default Navbar
