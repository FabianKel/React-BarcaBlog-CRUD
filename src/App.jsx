import { NavigationProvider } from '@hooks/useNavigate';
import { TokenProvider } from '@hooks/useToken';


import Router from './router'

import './App.css'


function Header() {
    return(
        
        <header>
        <TokenProvider>
                <NavigationProvider>
                    <Router/>
                </NavigationProvider>
            </TokenProvider>
        </header>

        

    )
  }
  
  function Footer() {
  return(
    <footer className="footer">
        <center>
            <p>FCBarcelona Blog | Derek Arreaga</p>
        </center>
    </footer>
    )
  }

const App = () => {
    return(
        <div>
            <Header/>
            <Footer />
        </div>
    )
};

export default App
