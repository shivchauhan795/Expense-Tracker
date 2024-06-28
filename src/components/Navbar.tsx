import React from 'react';
import { Link } from 'react-router-dom';
import favicon from '../assets/favicon.png';

const Navbar: React.FC = () => {
  return (
    <nav className='flex justify-between items-center p-4 bg-gray-700 text-white px-10'>
      <Link to={"/"}>
      <h1 className='text-2xl flex justify-center items-center uppercase'><img className='w-10' src={favicon} alt='favicon'/>TrackTally</h1>
      </Link>
      <ul className='flex gap-4'>
        <li><Link to="/add" className='hover:underline'>Add</Link></li>
        <li><Link to="/show" className='hover:underline'>Show</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
