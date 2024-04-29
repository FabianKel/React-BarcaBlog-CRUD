import React, { useEffect, useState } from 'react';
import estadioLogo from '../assets/estadio.svg'
import '../styles/home.css'




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
                          <tr>
                              <td><img src={post.equipoLocal.logoIMG} alt="Logo Local" className="LogoMarcador"></img>{post.partidoInfo.marcador_local}</td>
                              <td>{post.partidoInfo.marcador_visit} <img src={post.equipoVisitante.logoIMG} alt="Logo Visitante" className="LogoMarcador"></img></td>
                          </tr>
                          <tr>
                              <td>{post.equipoLocal.nombre} - </td>
                              <td> {post.equipoVisitante.nombre}</td>
                          </tr>
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


const api_dir = import.meta.env.VITE_API_DIR

const Home = () => {
    const [ posts, setPosts ] = useState([])
    

  async function fetchPosts(){
      try {
          // Realizar las solicitudes HTTP en paralelo
          const [listadoPosts, listadoPartidos] = await Promise.all([
              fetch(api_dir+'/posts'),
              fetch(api_dir+'/partidos')
          ]);

          // Convertir las respuestas a JSON
          const Posts_json = await listadoPosts.json();
          const Partidos_json = await listadoPartidos.json();

          // Mapear los datos de los posts y combinarlos con la información de los partidos
          const combinedData = await Promise.all(Posts_json.map(async post => {
              const partidoInfo = Partidos_json.find(partido => partido.id === post.partido_id);

              // Obtener información del equipo local
              const equipoLocalResponse = await fetch(`${api_dir}/equipos/${partidoInfo.local_id}`);
              const equipoLocalData = await equipoLocalResponse.json();

              // Obtener información del equipo visitante
              const equipoVisitanteResponse = await fetch(`${api_dir}/equipos/${partidoInfo.visit_id}`);
              const equipoVisitanteData = await equipoVisitanteResponse.json();

              // Obtener información de las acciones para este partido
              /*const accionesResponse = await fetch(`${api_dir}/acciones/${partidoInfo.id}`);
              const accionesData = await accionesResponse.json();*/

              return { ...post, partidoInfo, equipoLocal: equipoLocalData, equipoVisitante: equipoVisitanteData};
          }));

          // Ordenar los datos combinados por ID de forma descendente
          combinedData.sort((a, b) => b.id - a.id);

          // Establecer los datos combinados en el estado
          setPosts(combinedData);
      } catch (error) {
          console.error("Error fetching data:", error);
      }
  }

  useEffect(() => {
      fetchPosts()
  }, []);

  return(
      <div>
      
          {posts.map(post => <Post key={post.id} post={post} partidoInfo={post.partidoInfo} />)}
      </div>
  );
};

export default Home
