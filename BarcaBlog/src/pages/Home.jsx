import React, { useEffect, useState } from 'react';
import logo1 from '../assets/logo1.png'
import estadioLogo from '../assets/estadio.svg'
import '../App.css'

const Post = ({ post }) => {
        
  return(
      <div class="container_posts">
          <div class="post">
              <header class="header-container">
                  <div class="info-partido">
                      {post.partidoInfo.fecha}
                      <br/>
                      <div class="estadio">
                        <img class="estadioLogo" src={estadioLogo}></img>
                        {post.equipoLocal.NombreEstadio}
                      </div>
                  </div>

                  <div class="detalles-partido">
                      <table>
                          <tr>
                              <td><img src={post.equipoLocal.logoIMG} alt="Logo Local" class="LogoMarcador"></img>{post.partidoInfo.marcador_local}</td>
                              <td>{post.partidoInfo.marcador_visit} <img src={post.equipoVisitante.logoIMG} alt="Logo Visitante" class="LogoMarcador"></img></td>
                          </tr>
                          <tr>
                              <td>{post.equipoLocal.nombre} - </td>
                              <td> {post.equipoVisitante.nombre}</td>
                          </tr>
                      </table>
                  </div>
              </header>

              <hr/>
              <div class="tituloPost">
                      <h1>{post.title}</h1>
                  </div>
                  
              
              <h3>{post.content}</h3>
              <center>
                  <img src={post.imagen_data1} alt= {post.title} class="imagenPartido"/>
              </center>
          </div>
          <div class="overlay"></div>
      </div>
  );

};

const Home = () => {
  const [ posts, setPosts ] = useState([])

  async function fetchPosts(){
      try {
          // Realizar las solicitudes HTTP en paralelo
          const [listadoPosts, listadoPartidos] = await Promise.all([
              fetch('http://localhost:3000/posts'),
              fetch('http://localhost:3000/partidos')
          ]);

          // Convertir las respuestas a JSON
          const Posts_json = await listadoPosts.json();
          const Partidos_json = await listadoPartidos.json();

          // Mapear los datos de los posts y combinarlos con la información de los partidos
          const combinedData = await Promise.all(Posts_json.map(async post => {
              const partidoInfo = Partidos_json.find(partido => partido.id === post.partido_id);

              // Obtener información del equipo local
              const equipoLocalResponse = await fetch(`http://localhost:3000/equipos/${partidoInfo.local_id}`);
              const equipoLocalData = await equipoLocalResponse.json();

              // Obtener información del equipo visitante
              const equipoVisitanteResponse = await fetch(`http://localhost:3000/equipos/${partidoInfo.visit_id}`);
              const equipoVisitanteData = await equipoVisitanteResponse.json();

              // Obtener información de las acciones para este partido
              /*const accionesResponse = await fetch(`http://localhost:3000/acciones/${partidoInfo.id}`);
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
      <header>
          <div class = "ImgBanner">
          <center>
          <img src={logo1} class="LogoHeader"></img>
          </center>
          </div>
      </header>
          {posts.map(post => <Post key={post.id} post={post} partidoInfo={post.partidoInfo} />)}
      </div>
  );
};

export default Home
