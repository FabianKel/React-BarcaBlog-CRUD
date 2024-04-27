
import Nav from  "@components/Nav";
import "../styles/nav.css";

const Header = () => {
    return (
        <header>
        <div className="header-container">
            <div className="fondoLogo">
            </div>
        </div>
    </header>
    )
}


const Layout = () => {

    return (
        
        <div>
            <Header />
            <Nav />
        </div>
    )
}

export default Layout