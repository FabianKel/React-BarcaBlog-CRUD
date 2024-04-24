import { NavigationProvider } from '@hooks/useNavigate';
import Router from './router'



const App = () => {
    return(
        <NavigationProvider>
            <Router />
        </NavigationProvider>
    )
};

export default App
