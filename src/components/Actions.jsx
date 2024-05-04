import React from 'react';
import useApi from '@hooks/useApi';

import "@styles/acciones.css"

function Actions({ local_id, visit_id, match_id }) {

    const api_dir = import.meta.env.VITE_API_DIR;
    const accionesUrl = `${api_dir}/acciones/partido/${match_id}`;

    const { data, loading, error } = useApi(accionesUrl);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!data) {
        return <button>Obtener Acciones</button>;
    }

    const accionesLocal = data.filter(accion => accion.equipo_id === local_id);
    const accionesVisit = data.filter(accion => accion.equipo_id === visit_id);

    return (
        <div className="container-acciones">
            <div className="acciones_local">
                {accionesLocal.map((accion, index) => (
                    <div key={index}>
                        {accion.accion} {accion.minuto}'   {accion.autor}
                    </div>
                ))}
            </div>
            <div className="acciones_visit">
                {accionesVisit.map((accion, index) => (
                    <div key={index}>
                       {accion.accion} {accion.minuto}'    {accion.autor}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Actions;
