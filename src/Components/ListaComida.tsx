import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodCard from './CardComida';
import '../Styles/ListaComida.css';
import carritoImg from '../img/carrito.png'; // Importa la imagen

const foods = [
  { id: 1, name: 'Hamburguesa', price: 5 },
  { id: 2, name: 'Papas Fritas', price: 3 },
  { id: 3, name: 'Refresco', price: 2 },
];

const FoodList: React.FC = () => {
  const [cart, setCart] = useState<{ food: any, quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar la apertura y el cierre del carrito
  const navigate = useNavigate();
  const cartRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); // Cambiar el estado de 'isCartOpen'
  };

  // Función para agregar un producto al carrito y al globo de texto
  const addToCart = (food: any) => {
    const existingItem = cart.find(item => item.food.id === food.id);
    if (existingItem) {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item => {
          if (item.food.id === food.id) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return updatedCart;
      });
    } else {
      setCart(prevCart => [...prevCart, { food, quantity: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito y del globo de texto
  const removeFromCart = (food: any) => {
    setCart(prevCart => {
      const updatedCart = prevCart
        .map(item => {
          if (item.food.id === food.id && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(item => item.quantity > 0); // Filtra los elementos con cantidad mayor a 0
      return updatedCart;
    });
  };

  // Función para ir al carrito
  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

  // Calcula la cantidad total de productos en el carrito
  const totalItemsInCart = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container">
      <div className="cart-icon" onClick={toggleCart}>        
        <img src={carritoImg} alt="Carrito de Compras" />
        {cart.length > 0 && <div className="cart-count">{totalItemsInCart}</div>}
      </div>
      {isCartOpen && (
        <div ref={cartRef} className="cart-info open">
          <h2>Tu Carrito</h2>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                <span>{item.quantity}x</span> {item.food.name}
              </li>
            ))}
          </ul>
          <button className="btn-go-to-cart" onClick={goToCart}>Ir al Carrito</button>
        </div>
      )}
      <h1>Menú</h1>
      <div className="food-list">
        {foods.map(food => (
          <FoodCard
            key={food.id}
            food={food}
            addToCart={addToCart}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
