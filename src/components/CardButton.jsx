import React from 'react';
import useNavigate from "@hooks/useNavigate"
import '@styles/cardButton.css';



const CardButton = ({ title, route, icon }) => {
  const { navigate } = useNavigate();

  const handleClick = () => {
    let newPath = "/";
    if (route !== "home") {
      newPath = `/admin/${route}Post`;
    }
    navigate(newPath);
  };

  return (
    <div className="card" onClick={handleClick}>
      <div className="card-content">
        <div className="card-icon">{icon}</div>
        <h3>{title}</h3>
      </div>
    </div>
  );
};


export default CardButton;
