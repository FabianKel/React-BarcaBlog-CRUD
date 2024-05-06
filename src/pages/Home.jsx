import React, { useEffect, useState } from 'react';
import estadioLogo from '../assets/estadio.svg'
import '../styles/home.css'
import useNavigate from "@hooks/useNavigate"
import useApi from "@hooks/useApi"





const Post = ({ post }) => {
  return(
      <div className="container_posts">
          <div className="post">
              <div className="header-container">
                  <div className="info-partido">
                      {post.partidoInfo.fecha}
                      <br/>
                      <div className="estadio">
                        <img className="estadioLogo" src={estadioLogo}></img>
                        {post.equipoLocal.NombreEstadio}
                      </div>
                  </div>

                  <div className="detalles-partido">
                      <table>
                        <tbody>
                          <tr>
                              <td><img src={post.equipoLocal.logoIMG} alt="Logo Local" className="LogoMarcador"></img>{post.partidoInfo.marcador_local}</td>
                              <td>{post.partidoInfo.marcador_visit} <img src={post.equipoVisitante.logoIMG} alt="Logo Visitante" className="LogoMarcador"></img></td>
                          </tr>
                          <tr>
                              <td>{post.equipoLocal.nombre} - </td>
                              <td> {post.equipoVisitante.nombre}</td>
                          </tr>
                          </tbody>
                      </table>
                  </div>
              </div>

              <hr/>
              <div className="tituloPost">
                      <h1>{post.title}</h1>
                  </div>
                  
              
              <h3>{post.content}</h3>
              <center>
                  <img src={post.imagen_data1} alt= {post.title} className="imagenPartido"/>
              </center>
          </div>
          <div className="overlay"></div>
      </div>
  );

};



const Home = () => {
    const [posts, setPosts] = useState([]);
    const { navigate } = useNavigate();

    const api_dir = import.meta.env.VITE_API_DIR;
    const postsUrl = `${api_dir}/posts`;
    const partidosUrl = `${api_dir}/partidos`;
    const equiposUrl = `${api_dir}/equipos`;

    const { data: listadoPosts, loading: postsLoading, error: postsError } = useApi(postsUrl);
    const { data: listadoPartidos, loading: partidosLoading, error: partidosError } = useApi(partidosUrl);
    const { data: listadoEquipos, loading: equiposLoading, error: equiposError } = useApi(equiposUrl);

    useEffect(() => {
        if (!postsLoading && !partidosLoading && !equiposLoading) {
            if (postsError || partidosError || equiposError) {
                console.error("Error al cargar los datos:", postsError || partidosError || equiposError);
                if (postsError === "Token de acceso vencido" || partidosError === "Token de acceso vencido" ||equiposError === "Token de acceso vencido" ) {
                    navigate("/login");
                }
            } else {
                const combinedData = listadoPosts.map(post => {
                    const partidoInfo = listadoPartidos.find(partido => partido.id === post.partido_id);
                    // Obtener información del equipo local
                    const equipoLocal = listadoEquipos.find(partido => partido.id === partidoInfo.local_id);
                    // Obtener información del equipo visitante
                    const equipoVisitante = listadoEquipos.find(partido => partido.id === partidoInfo.visit_id);
                    return { ...post, partidoInfo, equipoLocal, equipoVisitante };
                });
                combinedData.sort((a, b) => b.id - a.id);
                setPosts(combinedData);
            }
        }
    }, [listadoPosts, listadoPartidos, listadoEquipos, postsLoading, partidosLoading, equiposLoading, postsError, partidosError, equiposError, navigate]);

    return (
        <div>
            {posts.map(post => <Post key={post.id} post={post} partidoInfo={post.partidoInfo} />)}
        </div>
    );
    
};

export default Home
