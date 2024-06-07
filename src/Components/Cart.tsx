import React from 'react';
import { useLocation } from 'react-router-dom';
import '../Styles/Cart.css';
import { ArticuloManufacturado } from '../types/ArticuloManufacturado';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface FoodCard {
  food: ArticuloManufacturado;
  addToCart: (food: ArticuloManufacturado) => void;
  removeFromCart: (food: ArticuloManufacturado) => void;
}

const Cart: React.FC<FoodCard> = ({ food, addToCart, removeFromCart }) => {
  const location = useLocation();
  const { cart } = location.state as { cart: { food: ArticuloManufacturado, quantity: number }[] };
  const navigate = useNavigate();

  const now = new Date();
  const timeString = now.toISOString().split('T')[1].split('.')[0];

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      return total + (item.food.precioVenta * item.quantity);
    }, 0);
  };

  const handleBuy = async () => {
    try {
      // Crear un nuevo pedido
      const pedidoData = {
        horaEstimadaFinalizacion: timeString, // Formato de fecha correcto
        total: calculateTotal(),
        totalCosto: calculateTotal(), // Ajusta esto si tienes un costo diferente al total
        estado: 'PREPARACION', // Ajusta esto según sea necesario
        tipoEnvio: 'DELIVERY', // Ajusta esto según sea necesario
        formaPago: 0, // Ajusta esto según sea necesario
        fechaPedido: new Date().toISOString(),
        detallePedidos: cart.map(item => ({
          cantidad: item.quantity,
          subTotal: item.food.precioVenta * item.quantity,
          articulo: { id: item.food.id, type: 'articuloManufacturado' },
        })),
        factura: {
          fechaFcturacion: new Date().toISOString(),
          totalVenta: calculateTotal(),
          formaPago: 0, // Ajusta esto según sea necesario
        },
        // Aquí puedes pasar más detalles del pedido si es necesario
        // Otros campos del pedido como cliente_id, domicilio_id, etc.
      };

      // Aquí se realiza la solicitud POST para crear el pedido
      await axios.post('http://localhost:8080/api/pedido/create', JSON.stringify(pedidoData), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      navigate('/menu');

    } catch (error) {
      console.error('Error al crear el pedido:', error);
    }
  };

  const clearCart = () => {
    // Limpiar el carrito
    // Redirigir al usuario al menú
    navigate('/menu');
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
            <button onClick={() => removeFromCart(food)}>-</button> {' '}
            <button onClick={() => addToCart(food)}>+</button>
            <span className="delete-icon" onClick={() => removeFromCart(item.food)}>🗑️</span>
          </div>
        ))}
      </div>
      <div>Total: ${calculateTotal()}</div>
      <div className="button-container">
        <button onClick={handleBuy}>Comprar</button> {/* Botón para comprar */}
        <button onClick={clearCart}>Eliminar Pedido</button> {/* Botón para eliminar pedido */}
      </div>
    </div>
  );
};

export default Cart;
