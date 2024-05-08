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
            <p>FCBarcelona Blog | <a href='https://github.com/FabianKel/proyecto1-web/blob/main/README.md#proyecto-blog-crud' target='_blank'>Derek Arreaga</a></p>
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
