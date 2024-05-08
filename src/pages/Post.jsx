import React, { useState, useEffect } from 'react';
import useApi from '@hooks/useApi';
import '@styles/cardButton.css';

const Post = ({ postID }) => {
  const api_dir = import.meta.env.VITE_API_DIR;
  const postUrl = `${api_dir}/posts/${postID}`;

  const [postData, setPostData] = useState(null);
  const [partidoData, setPartidoData] = useState(null);
  const [equipoLocalData, setEquipoLocalData] = useState(null);
  const [equipoVisitData, setEquipoVisitData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postDataResponse = await useApi(postUrl);
        setPostData(postDataResponse);

        const partidoUrl = `${api_dir}/partidos/${postDataResponse.partido_id}`;
        const partidoDataResponse = await useApi(partidoUrl);
        setPartidoData(partidoDataResponse);

        const equipoLocalUrl = `${api_dir}/equipos/${partidoDataResponse.local_id}`;
        const equipoVisitUrl = `${api_dir}/equipos/${partidoDataResponse.visit_id}`;
        const [equipoLocalDataResponse, equipoVisitDataResponse] = await Promise.all([
          useApi(equipoLocalUrl),
          useApi(equipoVisitUrl)
        ]);

        setEquipoLocalData(equipoLocalDataResponse);
        setEquipoVisitData(equipoVisitDataResponse);

        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
        console.error("Error al cargar los datos:", error);
      }
    };

    fetchData();
  }, [api_dir, postUrl]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Información del post</h1>
      <p>Título: {postData?.title}</p>
      <p>Contenido: {postData?.content}</p>
      {partidoData && (
        <div>
          <h2>Información del partido</h2>
          <p>Local: {equipoLocalData?.name}</p>
          <p>Visitante: {equipoVisitData?.name}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
