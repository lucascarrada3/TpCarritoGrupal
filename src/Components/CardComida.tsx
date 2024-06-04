import React from 'react';
import '../Styles/CardComida.css';
import carritoImg from '../img/carrito.png';

interface FoodCardProps {
  food: any;
  addToCart: (food: any) => void;
  removeFromCart: (food: any) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, addToCart, removeFromCart }) => {
  return (
    <div className="food-card">
      <h2>{food.name}</h2>
      <p>Precio: ${food.price}</p>
      <div className="cart-buttons">
      <button onClick={() => removeFromCart(food)}>
      -
        </button>
          <img src={carritoImg} alt="Carrito" style={{ width: '50px' }} />          
          <button onClick={() => addToCart(food)}>
      +
        </button>
      </div>
    </div>
  );
};

export default FoodCard;