import React, { useState } from 'react';
import useAPI from './useAPI';

function ComponenteConBoton() {
    const [mostrarLista, setMostrarLista] = useState(false);
    const [datos, setDatos] = useState([]);
    const { fetchData } = useAPI();

    const handleClick = async () => {
        try {
            const response = await fetchData();
            setDatos(response.data);
            setMostrarLista(true);
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const handleContraer = () => {
        setMostrarLista(false);
    };

    return (
        <div>
            <button onClick={handleClick}>Obtener Datos</button>
            {mostrarLista && (
                <>
                    <ul>
                        {datos.map((dato, index) => (
                            <li key={index}>{dato}</li>
                        ))}
                    </ul>
                    <button onClick={handleContraer}>Contraer</button>
                </>
            )}
        </div>
    );
}

export default ComponenteConBoton;