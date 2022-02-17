import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import { TiThMenu } from 'react-icons/ti'
import { AiOutlineClose } from 'react-icons/ai'  

export default function Navbar() {
    const [navbarOpen, setNavbarOpen] = useState(false)

    const handleNavbarToggle = () => {
      setNavbarOpen(previous => !previous)
    }

    const closeMenu = () => {
      setNavbarOpen(false)
    }

    return (
      <header >
        <NavLink to="/" className={'logo'}>
          <img className='logo__leaves' src={require('../assets/one-planet-logo.png')} alt='One Planet logo' />
        </NavLink>
        <nav>
          <button className='nav-button' onClick={handleNavbarToggle}>{navbarOpen ? <AiOutlineClose /> : <TiThMenu />}</button>
          <div className={`menuNav ${navbarOpen ? "showMenu" : ""}`}>
            <NavLink onClick={() => closeMenu()} to="/blog"  >Blog</NavLink>
            <NavLink onClick={() => closeMenu()} to="/shop" >Shop</NavLink>
            <NavLink onClick={() => closeMenu()} to="/reviews" >Reviews</NavLink>
            <NavLink onClick={() => closeMenu()} to="/contact" >Contact</NavLink>
          </div>
        </nav>
      </header>
    )
  }