// Carousel.jsx
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import comida1 from '../img/comida1.jpg'; // Importa tus imágenes de comida rápida
import comida2 from '../img/comida2.jpg';
import comida3 from '../img/comida3.jpg';

const CarouselComponent = () => {
  return (
    <Carousel showArrows={true} infiniteLoop={true} autoPlay={true} interval={3000}>
      <div>
        <img src={comida1} alt="Comida rápida 1" style={{ maxWidth: '500px', height: 'auto' }} />
      </div>
      <div>
        <img src={comida2} alt="Comida rápida 2" style={{ maxWidth: '600px', height: 'auto' }} />
      </div>
      <div>
        <img src={comida3} alt="Comida rápida 3" style={{ maxWidth: '600px', height: 'auto' }} />
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
