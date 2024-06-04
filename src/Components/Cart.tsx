import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/Cart.css';

const Cart: React.FC = () => {
  const location = useLocation();
  const { cart } = location.state as { cart: { food: any, quantity: number }[] };

    // Función para calcular el total del carrito
    const calculateTotal = () => {
      return cart.reduce((total, item) => {
        return total + (item.food.price * item.quantity);
      }, 0);
    };
  return (
    <div className="container">
      <h1>Carrito</h1>
      <div className="cart-list">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <h2>{item.food.name}</h2>
            <p>Precio: ${item.food.price}</p>
            <p>Cantidad: {item.quantity}</p>            
          </div>
        ))}
      </div>
      <div>Total: ${calculateTotal()}</div> {/* Muestra el total del carrito */}
    </div>
  );
};

export default Cart;
