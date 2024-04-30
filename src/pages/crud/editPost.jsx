import React, { useState, useEffect } from 'react';
import useNavigate from "@hooks/useNavigate";

const EditPost = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { navigate } = useNavigate();

  useEffect(() => {
    const api_dir = import.meta.env.VITE_API_DIR;
    const token = localStorage.getItem('access_token');

    const fetchPosts = async () => {
      try {
        const response = await fetch(api_dir + '/posts', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSelect = (postId) => {
    const selected = posts.find(post => post.id === postId);
    setSelectedPost(selected);
    setTitle(selected.title);
    setContent(selected.content);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const api_dir = import.meta.env.VITE_API_DIR;
    const token = localStorage.getItem('access_token');

    try {
      const updatedPost = {
        title: title,
        content: content,
      };

      const response = await fetch(api_dir + '/posts/' + selectedPost.id, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPost),
      });

      if (response.ok) {
        alert('Post actualizado correctamente 🤠');
        navigate('/');
      } else {
        const errorMessage = await response.text();
        alert(`Error al actualizar el post: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error al actualizar el post:', error);
      alert('Error al actualizar el post. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <div className='editForm'>
      <h2>Editar Post</h2>
      <div className="postSelector">
        <h3>Selecciona un post para editar:</h3>
        <select onChange={(e) => handlePostSelect(parseInt(e.target.value))}>
          <option value="">Seleccione un post</option>
          {posts.map(post => (
            <option key={post.id} value={post.id}>{post.title}</option>
          ))}
        </select>
      </div>
      {selectedPost && (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="title">Título:</label>
            <input type="text" id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="content">Contenido:</label>
            <textarea id="content" name="content" value={content} onChange={(e) => setContent(e.target.value)} required />
          </div>
          <div>
            <button type="submit">Actualizar</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditPost;
