import useNavigate from '@hooks/useNavigate'
import useToken from  '@hooks/useToken'

import Nav from '@components/Nav'

import Login from '@pages/Login';
import Logout from '@pages/Logout';
import User from '@pages/User';
import Home from '@pages/Home';
import admin_menu from '@pages/admin_menu';
import ViewMatches from '@pages/matches';

//CRUD
import createPost from '@pages/crud/createPost';
import editPost from '@pages/crud/editPost';
import deletePost from '@pages/crud/deletePost';


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
        requiresAuth: true
    },
    '/logout':{
        component: Logout,
        requiresAuth: false
    },
    '/user':{
        component: User,
        requiresAuth: false
    },
    '/matches': {
        component: ViewMatches,
        requiresAuth: false
    },
    '/admin/createPost' : {
        component: createPost,
        requiresAuth: true
    },
    '/admin/deletePost' : {
        component: deletePost,
        requiresAuth: true
    },
    '/admin/editPost' : {
        component: editPost,
        requiresAuth: true
    }

}

function Router() {
    const { token } = useToken()
    const { page } = useNavigate()

    let CurrentPage = () => <h1>404 Page not found</h1>

    if (routes[page]){
        if (!token && routes[page].requiresAuth) {
            CurrentPage = Login
        } else {
            CurrentPage = routes[page].component
        }
    }

    if (page == "/logout"){
        window.location.replace("/home")
        localStorage.clear()
    }

    return (
        <div>
            <Nav/>
            <CurrentPage/>
        </div>
    )
}

export default Router