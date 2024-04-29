import { useState } from 'react'
import CryptoJS from 'crypto-js'



import useToken from '@hooks/useToken'
import useNavigate from '@hooks/useNavigate'
import '../styles/home.css'


function Login() {
    const { setToken } = useToken()
    const { navigate } = useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()


    const ingresar = async () => {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: CryptoJS.MD5(password).toString()
            })
        })


        if (response.ok) {
            const  token  = await response.json()

            setToken(token.access_token)
            navigate('#/')

            window.location.replace('#/')
        }else{
            alert("Credenciales inválidas,  intenta de nuevo")
            return;
        }
        

          
        return
    }

    return (
        <div>
            <h1>Login</h1>
            <p>
                <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            </p>
            <p>
                <input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} />
            </p>
            <p>
                <button onClick={ingresar}>Ingresar</button>
            </p>
        </div>
    )
}

export default Login