import { useState } from 'react'
import CryptoJS from 'crypto-js'
import useNavigate from '@hooks/useNavigate'

function Login() {
    const { navigate } = useNavigate()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const ingresar = async () => {
        const response = await fetch("http://127.0.0.1:3001/login", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: CryptoJS.MD5(password).toString()
            })
        })

        if (!response.ok) {
            alert("Credenciales inválidas,  intenta de nuevo")
            return;
        }

        navigate('/admin')
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