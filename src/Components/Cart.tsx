// En tu componente Cart

import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/Cart.css';
import { ArticuloManufacturado } from '../Elements/Elements';
import carritoImg from '../img/carrito.png';
import axios from 'axios'; // Agrega esta importación

interface FoodCard {
  food: ArticuloManufacturado;
  addToCart: (food: ArticuloManufacturado) => void;
  removeFromCart: (food: ArticuloManufacturado) => void;
}

const Cart: React.FC<FoodCard> = ({ food, addToCart, removeFromCart }) => {
  const location = useLocation();
  const { cart } = location.state as { cart: { food: ArticuloManufacturado, quantity: number }[] };

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.food.precioVenta * item.quantity);
    }, 0);
  };

  const handleBuy = async () => {
    try {
      // Crear un nuevo pedido
      const pedidoResponse = await axios.post('http://localhost:8080/api/pedidos', {
        // Aquí puedes pasar más detalles del pedido si es necesario
        total: calculateTotal(),
        // Otros campos del pedido como cliente_id, domicilio_id, etc.
      });

      // Crear detalles del pedido
      await Promise.all(cart.map(async (item) => {
        await axios.post('http://localhost:8080/api/detallePedido', {
          cantidad: item.quantity,
          sub_total: item.food.precioVenta * item.quantity,
          articulo_id: item.food.id,
          pedido_id: pedidoResponse.data.id, // ID del pedido recién creado
        });
      }));

      // Redirigir a la página de confirmación de compra o a otra página
      // Aquí deberías cambiar la ruta según tus necesidades
      // Por ejemplo: history.push('/purchase-confirmation');
    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  return (
    <div className="container">
      <h1>Carrito</h1>
      <div className="cart-list">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <h2>{item.food.denominacion}</h2>
            <p>Precio: ${item.food.precioVenta}</p>
            <p>Cantidad: {item.quantity}</p>
            <button onClick={() => removeFromCart(food)}>-</button>
            <img src={carritoImg} alt="Carrito" style={{ width: '50px' }} />          
            <button onClick={() => addToCart(food)}>+</button>
          </div>
        ))}
      </div>
      <div>Total: ${calculateTotal()}</div>
      <button onClick={handleBuy}>Comprar</button> {/* Botón para comprar */}
    </div>
  );
};

export default Cart;
