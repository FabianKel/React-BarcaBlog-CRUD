import useToken from "@hooks/useToken"
import useNavigate from "@hooks/useNavigate"
import logo1 from "@assets/logo1.png"
import "../styles/nav.css"

const Nav = () => {
    const { isLoggedIn, getRawToken} = useToken()
    const { navigate } = useNavigate()

    let decodedToken = {}
    if (isLoggedIn) {
        decodedToken = getRawToken()
        console.log(decodedToken)
    }

    return (
        <nav className="nav-container">
            <a href="/">
            <center><img src={logo1} alt="Logo" className="logo" /></center>

            </a>
            <a href="#/" onClick={() => navigate('/')}>Inicio</a> |
            <a href="#/matches" onClick={() => navigate('/matches')}>Matches</a> |
            {
                isLoggedIn ? (
                    <>
                    <a href="#/admin" onClick={() => navigate('/admin')}>Admin</a>|
                    <a href="#/logout" onClick={() => navigate('/logout')}>Logout</a>
                    </>
                ) : (
                    <a href="#/login" onClick={() => navigate('/login')}>Login</a>  
                )
            }
        </nav>
    )
}

export default Nav