import React, { useState } from 'react';
import useAPI from './useAPI'; // Suponiendo que tienes un hook useAPI para llamar a la API

function ComponenteConBoton() {
    const [mostrarLista, setMostrarLista] = useState(false);
    const [datos, setDatos] = useState([]);
    const { fetchData } = useAPI(); // Suponiendo que useAPI devuelve una función fetchData

    const handleClick = async () => {
        try {
            const response = await fetchData(); // Llamada a la API para obtener datos
            setDatos(response.data); // Guardar los datos en el estado local
            setMostrarLista(true); // Mostrar la lista después de recibir los datos
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
    };

    const handleContraer = () => {
        setMostrarLista(false); // Ocultar la lista al hacer clic en el botón de contraer
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