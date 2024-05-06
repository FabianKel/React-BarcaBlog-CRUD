import React, { useState, useEffect } from 'react';
import useNavigate from "@hooks/useNavigate";
import '@styles/forms.css'


const CreatePost = () => {
  const [partidos, setPartidos] = useState([]);
  const [selectedPartido, setSelectedPartido] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imagenUrl, setImagenUrl] = useState('');
  const { navigate } = useNavigate();

  useEffect(() => {
    const api_dir = import.meta.env.VITE_API_DIR
    const fetchPartidos = async () => {
      try {
        const response = await fetch(api_dir+'/partidos');
        const data = await response.json();
        setPartidos(data);
      } catch (error) {
        console.error('Error fetching partidos:', error);
      }
    };

    fetchPartidos();
  }, []);

  const handleSubmit = async (e) => {
    const api_dir = import.meta.env.VITE_API_DIR
    const token = localStorage.getItem('access_token');
    console.log(token)

    e.preventDefault();
    // Validación básica para asegurar que se haya seleccionado un partido
    if (!selectedPartido) {
      alert('Por favor, selecciona un partido');
      return;
    }
  
    try {


      const PostData = {
      "title": title,
      "content": content,
      "imagen_data1": imagenUrl,
      "partido_id": parseInt(selectedPartido)
      }

      console.log(PostData)
  
      const response = await fetch(api_dir+'/posts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(PostData),
      });
  
      if (response.ok) {
        alert('Post publicado correctamente 🥸');
        
        navigate('/')
        window.location.replace('#/')
      } else {
        // Manejar errores del servidor
        const errorMessage = await response.text();
        console.log(errorMessage)
        alert(`Error al enviar datos: ${errorMessage}`);
      }
    } catch (error) {
      // Manejar otros errores
      console.error('Error al enviar datos:', error);
      alert('Error al enviar datos. Por favor, inténtalo de nuevo más tarde.');
    }
  };
  

  return (
    <div className='createForm'>
      <h2>Formulario de Partidos</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label htmlFor="partido">Selecciona un partido:</label>
          <select name="partido" id="partido" value={selectedPartido} onChange={(e) => setSelectedPartido(e.target.value)}>
            <option value="">Seleccione un partido</option>
            {partidos.map(partido => (
              <option key={partido.id} value={partido.id}>{partido.jornada}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="title">Título:</label>
          <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="content">Contenido:</label>
          <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="imagen_data1">URL de Imagen:</label>
          <input id="imagen_data1" name="imagen_data1" value={imagenUrl} onChange={(e) => setImagenUrl(e.target.value)} />
        </div>
        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;

