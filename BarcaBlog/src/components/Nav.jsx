import useNavigate from "@hooks/useNavigate"

const Nav = () => {
    const { navigate, isLoggedIn } = useNavigate()

    return (
        <nav>
            <a href="#/" onClick={() => navigate('/')}>Inicio</a> |
            {
                isLoggedIn ? (
                    <a href="#/admin" onClick={() => navigate('/admin')}>Admin Menú</a> |
                    <a href="#/logout" onClick={() => navigate('/logout')}>Logout</a>
                ) : (
                    <a href="#/login" onClick={() => navigate('/login')}>Login</a>
                )
            }
        </nav>
    )
}

export default Nav