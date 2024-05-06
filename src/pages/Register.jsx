import { useState } from 'react';
import useNavigate from '@hooks/useNavigate';
import '../styles/forms.css';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { navigate } = useNavigate();
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const registrar = async () => {
        const api_dir = import.meta.env.VITE_API_DIR;
        const registerUrl = `${api_dir}/register`;

        try {
            const response = await fetch(registerUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                navigate('/');
            } else {
                const errorData = await response.json();
                alert(errorData.error ? errorData.error.message : 'Error desconocido, por favor inténtalo de nuevo');
            }
        } catch (error) {
            alert('Error al registrar, por favor inténtalo de nuevo');
            console.error('Error al registrar:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className='form-login'>
            <h1>Registro</h1>
            <p>
                <input type="text" placeholder="Usuario" onChange={(e) => setUsername(e.target.value)} />
            </p>
            <p>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
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
                <button onClick={registrar}>Registrar</button>
            </p>
        </div>
    );
}

export default Register;
