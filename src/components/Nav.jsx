import useToken from "@hooks/useToken"
import useNavigate from "@hooks/useNavigate"
import logo1 from "@assets/logo1.png"
import "../styles/nav.css"

import {parseToken} from '../utils/auth'
import { useState, useEffect } from "react"

const Nav = () => {
    const { isLoggedIn, token} = useToken()
    const { navigate } = useNavigate()
    
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
      const handleScroll = () => {
        const isScrolled = window.scrollY > 0;
        setScrolled(isScrolled);
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
  

    let decodedToken = {}
    if (isLoggedIn) {
        decodedToken = parseToken(token)
    }

    return (
        <nav className={scrolled ? 'nav-container scrolled' : 'nav-container'}>
            <a href="/">
            <center><img src={logo1} alt="Logo" className="logo" /></center>

            </a>
            <a href="#/" onClick={() => navigate('/')}>Inicio</a>
            <a href="#/matches" onClick={() => navigate('/matches')}>Matches</a>
            {
                isLoggedIn ? (
                    <>
                    <a href="#/admin" onClick={() => navigate('/admin')}>Admin</a>
                    <a href="#/logout" onClick={() => navigate('/logout')}>Logout</a>
                    <a href="#/user" onClick={() => navigate('/user')}>Mi Cuenta</a>
                    </>
                ) : (
                    <>
                    <a href="#/login" onClick={() => navigate('/login')}>Login</a>
                    <a href="#/register" onClick={() => navigate('/register')}>Crear Cuenta</a>
                    </>
                )
            }
        </nav>
    )
}

export default Nav