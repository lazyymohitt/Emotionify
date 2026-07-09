import React from 'react'
import "./navbar.scss"

const Navbar = () => {
  return (
   
       <header className="navbar">

        <div className="navbar__left">

        <input className='navbar__search' type="text" placeholder='Search songs , artists...' />

        </div>

        <div className="navbar__right">

        <div className="navbar__weather">

          🌤 28°C

        </div>

        <button className="navbar__theme">

          🌙

        </button>

        <div className="navbar__user">

          Mohit

        </div>

      </div>
       </header>
  )
}

export default Navbar