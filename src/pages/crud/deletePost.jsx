import React, { useEffect, useState } from 'react';
import estadioLogo from '@assets/estadio.svg';
import '@styles/home.css';
import useNavigate from "@hooks/useNavigate";

const Post = ({ post, onDelete }) => {
  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <div className="container_posts">
      <div className="post">
        <div className="header-container">
          <div className="info-partido">
            {post.partidoInfo.fecha}
            <br />
            <div className="estadio">
              <img className="estadioLogo" src={estadioLogo} alt="Estadio Logo" />
              {post.equipoLocal.NombreEstadio}
            </div>
          </div>

          <div className="detalles-partido">
            <table>
              <tbody>
                <tr>
                  <td><img src={post.equipoLocal.logoIMG} alt="Local Logo" className="LogoMarcador" />{post.partidoInfo.marcador_local}</td>
                  <td>{post.partidoInfo.marcador_visit}<img src={post.equipoVisitante.logoIMG} alt="Visitante Logo" className="LogoMarcador" /></td>
                </tr>
                <tr>
                  <td>{post.equipoLocal.nombre}</td>
                  <td>{post.equipoVisitante.nombre}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <hr />
        <div className="tituloPost">
          <h1>{post.title}</h1>
        </div>

        <h3>{post.content}</h3>
        <center>
          <img src={post.imagen_data1} alt={post.title} className="imagenPartido" />
        </center>
        <button onClick={handleDelete}>Eliminar</button>
      </div>
      <div className="overlay"></div>
    </div>
  );
};

const api_dir = import.meta.env.VITE_API_DIR;

const PostDelete = () => {
  const [posts, setPosts] = useState([]);
  const { navigate } = useNavigate();

  async function fetchPosts() {
    try {
      const [listadoPosts, listadoPartidos] = await Promise.all([
        fetch(api_dir+'/posts'),
        fetch(api_dir+'/partidos')
      ]);

      const Posts_json = await listadoPosts.json();
      const Partidos_json = await listadoPartidos.json();

      const combinedData = await Promise.all(Posts_json.map(async post => {
        const partidoInfo = Partidos_json.find(partido => partido.id === post.partido_id);

        const equipoLocalResponse = await fetch(`${api_dir}/equipos/${partidoInfo.local_id}`);
        const equipoLocalData = await equipoLocalResponse.json();

        const equipoVisitanteResponse = await fetch(`${api_dir}/equipos/${partidoInfo.visit_id}`);
        const equipoVisitanteData = await equipoVisitanteResponse.json();

        return { ...post, partidoInfo, equipoLocal: equipoLocalData, equipoVisitante: equipoVisitanteData };
      }));

      combinedData.sort((a, b) => b.id - a.id);
      setPosts(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error === "Token de acceso vencido") {
        navigate("/login");
      }
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem('access_token');

    try {
      const response = await fetch(api_dir + '/posts/' + postId, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Post eliminado correctamente');
        fetchPosts();
      } else {
        const errorMessage = await response.text();
        alert(`Error al eliminar el post: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error al eliminar el post:', error);
      alert('Error al eliminar el post. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  );
};

export default PostDelete;
