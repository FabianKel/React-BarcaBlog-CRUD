import { useEffect } from 'react'
import useNavigate from "@hooks/useNavigate"

const Logout = () => {
    const { navigate } = useNavigate()

    useEffect(() => {
        localStorage.clear()

        setTimeout(() => {
            navigate('#/')
            window.location.replace('#/')
        }, 1000)
    }, [])

    return <h1>Cerrando Sesión...</h1>
}

export default Logout