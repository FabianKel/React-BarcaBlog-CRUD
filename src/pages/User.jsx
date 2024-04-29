import useToken from '@hooks/useToken'
import {parseToken} from '../utils/auth'
import '../styles/user.css'


function User() {
    const { token } = useToken()
    const decodedToken = parseToken(token)
    console.log(decodedToken)

    return (
        <div>
            <main>
                <section class="user-profile">
                    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.spotteron.net%2Fimages%2Ficons%2Fuser60.png&f=1&nofb=1&ipt=9fc797f056092e9b11b1bfa872ab373d4d643611c008ca6f92d814a47c9a18ca&ipo=images" alt="Foto de Perfil Placeholder"></img>
                    <h1>Perfil de Usuario</h1>
                    <div class="user-details">
                        <p><strong>Nombre:</strong>{decodedToken.username}</p>
                        <p><strong>Correo Electrónico:</strong>{decodedToken.email}</p>
                        <p><strong>Fecha de Registro:</strong> 28 de abril de 2024</p>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default User