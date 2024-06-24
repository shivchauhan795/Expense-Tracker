import React from 'react'
import { Link } from 'react-router-dom'
import favicon from "../assets/favicon.png"

const Navbar = () => {
  return (
    <div className='navbar flex justify-between bg-slate-700 text-white h-14 items-center px-28'>
      <Link to={"/"}>
        <div className="flex gap-2 justify-center items-center">
          <img className='size-10' src={favicon} />
          <h2 className='text-2xl uppercase'>
            TrackTally
          </h2>
        </div>
      </Link>
      <div className="navItems flex gap-3">
        <Link to={"/add"}>Add</Link>
        <Link to={"/show"}>Show</Link>
      </div>
    </div>
  )
}

export default Navbar
