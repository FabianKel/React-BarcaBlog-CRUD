import React from 'react';
import CardButton from '@components/CardButton';
import '@styles/cardButton.css';


const admin_menu = () => {
  return (
    <div className="admin-menu">
      <h2>Dashboard</h2>
      <div className="card-container">
        <CardButton title="volver" route="home" icon="🏃‍♂️" />
        <CardButton title="Agregar Post" route="create" icon="➕" />
        <CardButton title="Editar Post" route="edit" icon="📩"/>
        <CardButton title="Eliminar Post" route="delete" icon="🗑️"/>
      </div>
    </div>
  );
};

export default admin_menu;
