import React from 'react';
import '../Styles/CardComida.css';
import carritoImg from '../img/carrito.png';
import { ArticuloManufacturado } from '../types/ArticuloManufacturado';

interface FoodCardProps {
  food: ArticuloManufacturado;
  addToCart: (food: ArticuloManufacturado) => void;
  removeFromCart: (food: ArticuloManufacturado) => void;
}

const FoodCard: React.FC<FoodCardProps> = ({ food, addToCart, removeFromCart }) => {
  return (
    <div className="food-card">
      <h2>{food.denominacion}</h2>
      <p>Precio: ${food.precioVenta}</p>
      <div className="cart-buttons">
        <button onClick={() => removeFromCart(food)}>-</button>
        <img src={carritoImg} alt="Carrito" style={{ width: '50px' }} />          
        <button onClick={() => addToCart(food)}>+</button>
      </div>
    </div>
  );
};

export default FoodCard;
