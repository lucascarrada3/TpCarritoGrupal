// Home.tsx
import React from 'react';
import CarouselComponent from '../Components/Carrousel';
import '../Styles/Home.css'; // Asegúrate de tener el archivo CSS para estilos

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-container">
        <h1>Bienvenido a Comidas Cowboy</h1>
        <p>¡Descubre nuestras deliciosas opciones de comida rápida!</p>
        <CarouselComponent />
      </div>
    </div>
  );
};

export default Home;
