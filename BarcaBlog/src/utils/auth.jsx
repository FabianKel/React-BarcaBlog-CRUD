import {jwtDecode} from 'jwt-decode';

const parseToken = (token) => {
  try {
    if (token) {
        const parseToken = jwtDecode(token);
        return parseToken;
    }
    
  } catch (error) {
    console.error('Error al decodificar el token:', error.message);
  }
}

export { parseToken };
