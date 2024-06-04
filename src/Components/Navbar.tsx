import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Navbar.css'; // Asegúrate de tener el archivo CSS para estilos
import logoImg from '../img/logo.png'; // Importa la imagen del logo

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          <img src={logoImg} alt="Logo" className="logo-image" />
        </Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">Inicio</Link>
        </li>
        <li className="nav-item">
          <Link to="/menu" className="nav-link">Menú</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
