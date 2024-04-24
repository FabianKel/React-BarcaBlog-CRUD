import useNavigate from "@hooks/useNavigate"
import "../styles/nav.css";

const Nav = () => {
    const { navigate, isLoggedIn } = useNavigate()

    return (
        <nav className="nav-container">
            <a href="#/" onClick={() => navigate('/')}>Inicio</a> |
            <a href="#/admin" onClick={() => navigate('/admin')}>Admin CRUD</a> |
            <a href="#/matches" onClick={() => navigate('/matches')}>Matches</a> |
            {
                isLoggedIn ? (
                    
                    <a href="#/logout" onClick={() => navigate('/logout')}>Logout</a>|
                    <a href="#/admin" onClick={() => navigate('/admin')}>Matches</a>
                ) : (
                    <a href="#/login" onClick={() => navigate('/login')}>Login</a>  
                )
            }
        </nav>
    )
}

export default Nav