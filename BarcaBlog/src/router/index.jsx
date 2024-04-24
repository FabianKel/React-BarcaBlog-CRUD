import useNavigate from '@hooks/useNavigate'

import Nav from '@components/Nav'

import Login from '@pages/Login';
import Home from '@pages/Home';
import admin_menu from '@pages/admin_menu';
import ViewMatches from '@pages/matches';

import '../index.css'

const routes = {

    '/': {
        component: Home,
        requiresAuth: false
    },
    '/login': {
        component: Login,
        requiresAuth: false
    },
    '/admin': {
        component: admin_menu,
        requiresAuth: false
    },
    '/matches': {
        component: ViewMatches,
        requiresAuth: false
    }

}

function Router() {
    const { page } = useNavigate()

    let CurrentPage = () => <h1>404 Page not found</h1>

    if (routes[page]){
        CurrentPage = routes[page].component
    }

    return (
        <div>
            <Nav/>
            <CurrentPage/>
        </div>
    )
}

export default Router