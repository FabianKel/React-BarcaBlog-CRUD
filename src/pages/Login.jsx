import { useState } from 'react'
import CryptoJS from 'crypto-js'

import '@fortawesome/fontawesome-free/css/all.css';



import useToken from '@hooks/useToken'
import useNavigate from '@hooks/useNavigate'
import '../styles/forms.css'


function Login() {
    const { setToken } = useToken()
    const { navigate } = useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);



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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='form-login'>
            <h1>Login</h1>
            <p>
                <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            </p>
            <p>
                
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="password-toggle" onClick={togglePasswordVisibility}>
                    <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                </button>
            </p>
            <p>
                <button onClick={ingresar}>Ingresar</button>
            </p>
            <a href="#/register" onClick={() => navigate('/register')} >¿No tienes cuenta? Crea una</a>
            <br/>
        </div>
    )
}

export default Login