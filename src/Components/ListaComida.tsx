import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodCard from './CardComida';
import '../Styles/ListaComida.css';
import carritoImg from '../img/carrito.png';
import { fetchArticulosManufacturados } from '../Backend/FuncionesApi';
import { ArticuloManufacturado } from '../types/ArticuloManufacturado';

const FoodList: React.FC = () => {
  const [cart, setCart] = useState<{ food: ArticuloManufacturado, quantity: number }[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [foods, setFoods] = useState<ArticuloManufacturado[]>([]);
  const navigate = useNavigate();
  const cartRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchArticulosManufacturados();
      setFoods(data);
    }

    fetchData();

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
    setIsCartOpen(!isCartOpen);
  };

  const addToCart = (foodId: number) => {
    const existingItem = cart.find(item => item.food.id === foodId);
    const foodToAdd = foods.find(food => food.id === foodId);
    if (existingItem) {
      setCart(prevCart => {
        const updatedCart = prevCart.map(item => {
          if (item.food.id === foodId) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        });
        return updatedCart;
      });
    } else {
      setCart(prevCart => [...prevCart, { food: foodToAdd!, quantity: 1 }]);
    }
  };
  
  
  const removeFromCart = (foodId: number) => {
    setCart(prevCart => {
      const updatedCart = prevCart
        .map(item => {
          if (item.food.id === foodId && item.quantity > 0) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter(item => item.quantity > 0);
      return updatedCart;
    });
  };

  const goToCart = () => {
    navigate('/cart', { state: { cart } });
  };

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
                <span>{item.quantity}x</span> {item.food.denominacion}
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
            addToCart={() => addToCart(food.id)}
            removeFromCart={() => removeFromCart(food.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default FoodList;
